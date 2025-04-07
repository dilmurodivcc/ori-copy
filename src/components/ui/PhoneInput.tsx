import React, { useRef, useEffect } from "react";
import IMask from "imask";

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
}

const PhoneInput: React.FC<PhoneInputProps> = ({ value, onChange }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!inputRef.current) return;

    const maskOptions = {
      mask: "+998 00 000 00 00",
      lazy: false,
      placeholderChar: "_",
      overwrite: true,
    };

    const mask = IMask(inputRef.current, maskOptions);
    mask.value = value || "+998 "; // Oldingi qiymatni tiklash

    mask.on("accept", () => {
      onChange(mask.value);
    });

    return () => mask.destroy();
  }, [value, onChange]);

  return <input ref={inputRef} type="text" className="border p-2 rounded w-full" />;
};

export default PhoneInput;
