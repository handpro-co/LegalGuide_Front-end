import { useState } from "react";

const ContactUsSendComment = () => {
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailError, setEmailError] = useState("");

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const sendContactUs = async () => {
    if (!validateEmail(mail)) {
      setEmailError("Буруу имэйл хаяг. Уг имэйл хаягийг шалгана уу.");
      return;
    } else {
      setEmailError("");
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("YOUR_API_ENDPOINT_HERE", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, mail, message }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      setName("");
      setMail("");
      setMessage("");
    } catch (error) {
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = name && validateEmail(mail) && message;

  return (
    <div className="w-full max-w-[600px] mx-auto mt-[150px] z-[1] flex flex-col gap-[32px] p-4">
      <div className="text-[32px] md:text-[48px] text-[#282828] font-bold text-center">
        Холбоо барих
      </div>
      <div className="w-full p-[32px] bg-[#edf0fc] flex flex-col gap-[20px] rounded-[24px]">
        <div className="flex flex-col md:flex-row gap-[20px]">
          <div className="flex flex-col gap-[10px] w-full md:w-1/2">
            <label className="font-medium text-[16px] text-[#282828]">
              Нэр
            </label>
            <input
              type="text"
              className="p-[12px] h-[40px] rounded-[8px] border border-gray-300"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Таны нэр"
            />
          </div>
          <div className="flex flex-col gap-[10px] w-full md:w-1/2">
            <label className="font-medium text-[16px] text-[#282828]">
              Холбоо барих И-Майл
            </label>
            <input
              type="email"
              className="p-[12px] h-[40px] rounded-[8px] border border-gray-300"
              value={mail}
              onChange={(e) => setMail(e.target.value)}
              placeholder="Таны mail хаяг"
            />
            {emailError && (
              <div className="text-red-500 text-sm">{emailError}</div>
            )}
          </div>
        </div>
        <div className="w-full flex flex-col gap-[10px]">
          <label className="text-[#282828] text-[16px] font-medium">
            Ямар асуудлаар зөвлөгөө (үйлчилгээ) авахыг хүсч байна вэ?
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="p-[12px] rounded-[8px] w-full h-[200px] border border-gray-300"
            placeholder="Таны мэссэж"
          />
        </div>
        <button
          onClick={sendContactUs}
          className="bg-[#226FD8] text-white py-[12px] px-[32px] rounded-[24px] flex items-center justify-center gap-[10px] transition-opacity duration-200"
          disabled={!isFormValid || isSubmitting} // Disable button if form is invalid or submitting
        >
          <span className="font-bold">
            {isSubmitting ? "Илгээж байна..." : "Илгээх"}
          </span>
        </button>
      </div>
    </div>
  );
};
export default ContactUsSendComment;
