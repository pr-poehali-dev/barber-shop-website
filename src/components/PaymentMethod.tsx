
import { RadioGroupItem } from "@/components/ui/radio-group";
import Icon from "@/components/ui/icon";

interface PaymentMethodProps {
  value: string;
  name: string;
  icon: string;
  description: string;
  checked: boolean;
}

export function PaymentMethod({ 
  value, 
  name, 
  icon, 
  description, 
  checked 
}: PaymentMethodProps) {
  return (
    <div className={`
      relative flex items-center space-x-2 rounded-md border p-4 shadow-sm 
      ${checked ? 'border-primary bg-primary/5' : 'border-input'}
      transition-colors hover:bg-accent hover:text-accent-foreground
    `}>
      <RadioGroupItem value={value} id={value} className="absolute top-4 right-4" />
      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
        <Icon name={icon} className="h-5 w-5 text-primary" />
      </div>
      <div className="space-y-1">
        <label
          htmlFor={value}
          className="block text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {name}
        </label>
        <p className="text-xs text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
}
