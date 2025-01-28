import { Button } from "@/components/ui/button";

interface ButtonDemoProps {
  label: string;
  onClick?: () => void;
  // Aapko agar aur props dene hain, to unko yahan add kar sakte hain
}

export function ButtonDemo({ label, onClick, ...props }: ButtonDemoProps) {
  return (
    <Button onClick={onClick} {...props} className="w-[400px] h-[52px] bg-black text-white rounded-full text-lg">
      {label}
    </Button>
  );
}
