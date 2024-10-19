import {
  AlertDialog as AlertDialogs,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

interface AlertDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  cancelLabel?: string;
  cancelVisibility?: string;
}

const AlertDialog: React.FC<AlertDialogProps> = ({
  open,
  onOpenChange,
  title,
  description,
  actionLabel = "OK",
  cancelLabel = "Cancel",
  onAction,
  cancelVisibility
}) => {

  const handleAction = () => {
    if (onAction) {
      onAction();
    }
    onOpenChange(false);
  };

  return (
    <>
      <AlertDialogs open={open} onOpenChange={onOpenChange}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <AlertDialogDescription>{description}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogAction onClick={handleAction} className="bg-red-500">
            {actionLabel}
          </AlertDialogAction>
          <AlertDialogCancel onClick={() => onOpenChange(false)} className={` ${cancelVisibility}`}>{cancelLabel}</AlertDialogCancel>
        </AlertDialogContent>
      </AlertDialogs>
    </>
  );
};

export default AlertDialog;
