export default function AnimatedBlobs() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-[hsl(var(--purple)/0.12)] blur-[120px] animate-float" />
      <div className="absolute top-1/3 -right-20 w-[500px] h-[500px] rounded-full bg-[hsl(var(--blue)/0.1)] blur-[100px] animate-float-delay" />
      <div className="absolute -bottom-40 left-1/3 w-[500px] h-[500px] rounded-full bg-[hsl(var(--teal)/0.08)] blur-[120px] animate-float-slow" />
    </div>
  );
}
