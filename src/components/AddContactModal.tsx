import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Plus, Sparkles, CheckCircle, Info } from 'lucide-react';
import { Category, CategoryId, Upazila } from '../types';

interface AddContactModalProps {
  categories: Category[];
  isOpen: boolean;
  onClose: () => void;
  onAddContact: (newContact: {
    name: string;
    category: CategoryId;
    phoneNumber: string;
    upazila: Exclude<Upazila, 'All'>;
    location: string;
    details?: string;
  }) => void;
}

const UPAZILAS: Exclude<Upazila, 'All'>[] = [
  'Sadar',
  'Naria',
  'Zajira',
  'Bhedarganj',
  'Damudya',
  'Gosairhat',
];

export const AddContactModal: React.FC<AddContactModalProps> = ({
  categories,
  isOpen,
  onClose,
  onAddContact,
}) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<CategoryId>('police');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [upazila, setUpazila] = useState<Exclude<Upazila, 'All'>>('Sadar');
  const [location, setLocation] = useState('');
  const [details, setDetails] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  if (!isOpen) return null;

  const validate = () => {
    const tempErrors: { [key: string]: string } = {};
    if (!name.trim()) tempErrors.name = 'Service/Contact Name is required';
    if (!location.trim()) tempErrors.location = 'Location/Address is required';

    // Basic BD Phone validation (01xxxxxxxxx or +8801xxxxxxxxx)
    const phoneTrimmed = phoneNumber.trim();
    if (!phoneTrimmed) {
      tempErrors.phoneNumber = 'Phone number is required';
    } else {
      const bdPhoneRegex = /^(?:\+88)?01[3-9]\d{8}$/;
      if (!bdPhoneRegex.test(phoneTrimmed.replace(/\s+/g, ''))) {
        tempErrors.phoneNumber = 'Enter a valid Bangladeshi number (e.g., 01712345678)';
      }
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    onAddContact({
      name: name.trim(),
      category,
      phoneNumber: phoneNumber.trim(),
      upazila,
      location: location.trim(),
      details: details.trim() || undefined,
    });

    setIsSuccess(true);
    setTimeout(() => {
      // Reset state and close modal
      setName('');
      setCategory('police');
      setPhoneNumber('');
      setUpazila('Sadar');
      setLocation('');
      setDetails('');
      setErrors({});
      setIsSuccess(false);
      onClose();
    }, 2000);
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div
        id="add-listing-modal"
        className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto z-10 animate-fade-in border border-slate-100"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between z-20">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
              <Plus size={20} />
            </div>
            <div>
              <h2 className="font-display font-bold text-slate-800 text-lg leading-tight">
                Suggest New Listing
              </h2>
              <p className="text-slate-500 text-xs">Help the Shariatpur community</p>
            </div>
          </div>
          <button
            id="close-modal-btn"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {isSuccess ? (
            <div className="py-8 flex flex-col items-center justify-center text-center">
              <div className="h-16 w-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4 animate-bounce">
                <CheckCircle size={36} />
              </div>
              <h3 className="font-display font-bold text-slate-800 text-xl mb-2">
                Listing Added Successfully!
              </h3>
              <p className="text-slate-500 text-sm max-w-xs">
                Thank you! The contact has been cached locally and is instantly visible in the helper guide.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Info Note */}
              <div className="flex gap-2 p-3.5 bg-indigo-50 border border-indigo-100/50 rounded-xl text-indigo-800 text-xs leading-relaxed">
                <Info size={16} className="text-indigo-600 flex-shrink-0 mt-0.5" />
                <p>
                  Any listings you add are immediately saved to your device cache and marked with a <strong>"Added by User"</strong> tag.
                </p>
              </div>

              {/* Service/Person Name */}
              <div>
                <label className="block text-slate-700 text-xs font-semibold uppercase tracking-wider mb-1">
                  Name of Service or Person <span className="text-rose-500">*</span>
                </label>
                <input
                  id="form-input-name"
                  type="text"
                  placeholder="e.g., Shariatpur Emergency Ambulance Service"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-xl border font-sans text-sm outline-none transition-colors duration-200
                    ${
                      errors.name
                        ? 'border-rose-400 focus:border-rose-500 bg-rose-50/20'
                        : 'border-slate-200 focus:border-emerald-500 bg-slate-50/50 focus:bg-white'
                    }
                  `}
                />
                {errors.name && (
                  <p className="text-rose-500 text-xs mt-1 font-medium">{errors.name}</p>
                )}
              </div>

              {/* Grid for Category and Upazila */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Category Selector */}
                <div>
                  <label className="block text-slate-700 text-xs font-semibold uppercase tracking-wider mb-1">
                    Category <span className="text-rose-500">*</span>
                  </label>
                  <select
                    id="form-select-category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value as CategoryId)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white outline-none focus:border-emerald-500 font-sans text-sm cursor-pointer"
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Upazila Selector */}
                <div>
                  <label className="block text-slate-700 text-xs font-semibold uppercase tracking-wider mb-1">
                    Upazila/Location <span className="text-rose-500">*</span>
                  </label>
                  <select
                    id="form-select-upazila"
                    value={upazila}
                    onChange={(e) => setUpazila(e.target.value as Exclude<Upazila, 'All'>)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white outline-none focus:border-emerald-500 font-sans text-sm cursor-pointer"
                  >
                    {UPAZILAS.map((up) => (
                      <option key={up} value={up}>
                        {up}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-slate-700 text-xs font-semibold uppercase tracking-wider mb-1">
                  Phone Number <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    id="form-input-phone"
                    type="tel"
                    placeholder="e.g., 01712345678"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className={`w-full px-4 py-2.5 rounded-xl border font-sans text-sm outline-none transition-colors duration-200
                      ${
                        errors.phoneNumber
                          ? 'border-rose-400 focus:border-rose-500 bg-rose-50/20'
                          : 'border-slate-200 focus:border-emerald-500 bg-slate-50/50 focus:bg-white'
                      }
                    `}
                  />
                </div>
                <p className="text-slate-400 text-[10px] mt-1">
                  Enter Bangladesh mobile or landline starting with 01 or +880.
                </p>
                {errors.phoneNumber && (
                  <p className="text-rose-500 text-xs mt-1 font-medium">{errors.phoneNumber}</p>
                )}
              </div>

              {/* Location/Specific Address */}
              <div>
                <label className="block text-slate-700 text-xs font-semibold uppercase tracking-wider mb-1">
                  Specific Location/Address <span className="text-rose-500">*</span>
                </label>
                <input
                  id="form-input-location"
                  type="text"
                  placeholder="e.g., Hospital Gate, Angaria Bazar Road"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-xl border font-sans text-sm outline-none transition-colors duration-200
                    ${
                      errors.location
                        ? 'border-rose-400 focus:border-rose-500 bg-rose-50/20'
                        : 'border-slate-200 focus:border-emerald-500 bg-slate-50/50 focus:bg-white'
                    }
                  `}
                />
                {errors.location && (
                  <p className="text-rose-500 text-xs mt-1 font-medium">{errors.location}</p>
                )}
              </div>

              {/* Details/Schedule Notes */}
              <div>
                <label className="block text-slate-700 text-xs font-semibold uppercase tracking-wider mb-1">
                  Extra Details / Availability <span className="text-slate-400">(Optional)</span>
                </label>
                <textarea
                  id="form-textarea-details"
                  rows={2}
                  placeholder="e.g., Open 24/7, Friday closed, O+ Blood Group volunteer, Bus leaves at 7:30 AM"
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white outline-none focus:border-emerald-500 font-sans text-sm resize-none"
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  id="submit-cancel-btn"
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-3 px-4 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 font-sans font-semibold text-sm transition-colors cursor-pointer text-center"
                >
                  Cancel
                </button>
                <button
                  id="submit-save-btn"
                  type="submit"
                  className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-sans font-bold text-sm tracking-wide transition-colors shadow-sm shadow-emerald-950/10 cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Sparkles size={16} />
                  Save Listing
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};
