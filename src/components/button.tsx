import { Button } from "@/components/ui/button";

interface ButtonDemoProps {
  label: string;
  onClick?: () => void;
  // Aapko agar aur props dene hain, to unko yahan add kar sakte hain
}

export function ButtonDemo({ label, onClick, ...props }: ButtonDemoProps) {
  return (
    <Button onClick={onClick} {...props}>
      {label}
    </Button>
  );
}
