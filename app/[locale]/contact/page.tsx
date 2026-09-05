export default function ContactPage() {
  return (
    <div className="min-h-screen py-16 relative z-10">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <div className="bg-white p-10 rounded-2xl border border-slate-200 shadow-md">
          <h1 className="text-3xl md:text-4xl font-bold text-navy mb-4">Contact Us</h1>
          <p className="text-slate-600 leading-relaxed text-base">
            For eVisa assistance, please call the official 24/7 helpdesk at{" "}
            <strong className="text-navy font-bold">+91-11-24300666</strong> or email{" "}
            <strong className="text-blue-600 font-bold">indiatvoa@gov.in</strong>.
          </p>
        </div>
      </div>
    </div>
  );
}
