import React from "react";

const TandC = ({ isOpen, onAgree, onCancel }) => {

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[60]"
      onClick={onCancel}
    >
      <div
        className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-8 flex flex-col gap-5"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="font-display text-2xl text-arl-primary text-center">
          Terms & Conditions
        </h2>

        {/* Scrollable content */}
        <div className="overflow-y-auto max-h-60 flex flex-col gap-3 pr-1 text-sm text-gray-600 leading-relaxed">
          <p>
            By creating an account, you agree to comply with all the rules
            and policies of this application.
          </p>
          <p>
            You are responsible for keeping your account credentials secure.
            Any activity that occurs under your account is your responsibility.
          </p>
          <p>
            We respect your privacy and your personal information will be
            handled according to our privacy policy.
          </p>
          <p>
            The platform may update these terms at any time. Continued use
            of the service means that you accept the updated terms.
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-1">
          <button
            onClick={onCancel}
            className="flex-1 border border-gray-200 text-gray-600 py-3 rounded-xl font-medium hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            onClick={onAgree}
            className="flex-1 bg-arl-cta text-white py-3 rounded-xl font-medium hover:bg-arl-secondary transition-all duration-300"
          >
            Agree
          </button>
        </div>
      </div>
    </div>
  );
};

export default TandC;
