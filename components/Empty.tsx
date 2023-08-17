import Image from "next/image";

interface EmptyProps {
  label: string;
}

export default function Empty({ label }: EmptyProps) {
  return (
    <div className="h-full p-20 flex flex-col items-center justify-center">
      <div className="relative h-36 w-36">
        <Image src="/empty-state.png" alt="empty" fill />
      </div>
      <small className="text-muted-foreground">{label}</small>
    </div>
  );
}
