import { cn } from "@/lib/utils";

interface WhatsAppButtonProps {
  /** WhatsApp number in international format, digits only (no +, spaces, or dashes) */
  phoneNumber: string;
  /** Optional prefilled message that opens in the chat */
  message?: string;
  /** Controls visibility — pass false to hide (e.g. while the chatbot window is open) */
  visible?: boolean;
}

export default function WhatsAppButton({
  phoneNumber,
  message = "Hi Muhammad, I found your portfolio and would like to connect!",
  visible = true,
}: WhatsAppButtonProps) {
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className={cn(
        "fixed bottom-24 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all duration-300 hover:scale-105 active:scale-95",
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-4 pointer-events-none"
      )}
    >
      <svg viewBox="0 0 32 32" className="h-7 w-7" fill="currentColor" aria-hidden="true">
        <path d="M16.004 3C9.377 3 4 8.373 4 15c0 2.34.657 4.522 1.796 6.383L4 29l7.82-1.752A11.94 11.94 0 0 0 16.004 27C22.63 27 28 21.627 28 15S22.63 3 16.004 3Zm0 21.75a9.7 9.7 0 0 1-4.95-1.354l-.355-.21-4.64 1.04 1.024-4.52-.232-.368A9.71 9.71 0 0 1 5.25 15c0-5.937 4.817-10.75 10.754-10.75S26.75 9.063 26.75 15 21.93 24.75 16.004 24.75Zm5.55-7.35c-.304-.152-1.797-.887-2.076-.988-.278-.102-.48-.152-.683.152-.203.304-.784.988-.961 1.19-.177.203-.354.228-.658.076-.304-.152-1.283-.473-2.444-1.51-.903-.805-1.513-1.8-1.69-2.104-.177-.304-.019-.469.133-.62.137-.136.304-.354.456-.53.152-.178.203-.304.304-.507.101-.203.05-.38-.025-.532-.076-.152-.683-1.646-.936-2.253-.247-.593-.498-.513-.683-.522l-.582-.01c-.203 0-.532.076-.81.38-.278.304-1.06 1.036-1.06 2.53 0 1.494 1.086 2.938 1.238 3.14.152.203 2.137 3.26 5.176 4.573.723.312 1.287.498 1.727.637.726.231 1.386.198 1.908.12.582-.087 1.797-.735 2.05-1.444.253-.71.253-1.317.177-1.444-.076-.127-.278-.203-.582-.355Z" />
      </svg>
    </a>
  );
}