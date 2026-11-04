import { Loader } from '@/components/ui/Loader';

export default function Loading() {
  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center">
      <Loader size="lg" text="Chargement..." />
    </div>
  );
}