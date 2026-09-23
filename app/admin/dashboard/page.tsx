import AdminHeader from "@/components/admin/admin-header";

export default function Dashboard() {
  return (
    <main className="relative flex min-h-screen flex-col items-center overflow-hidden px-3">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 size-105 rounded-full bg-primary/12 blur-[130px]" />
        <div className="absolute -bottom-48 -left-32 size-110 rounded-full bg-primary/14 blur-[150px]" />
        <div className="absolute top-[28%] -right-48 size-110 rounded-full bg-primary/8 blur-[150px]" />
        <div className="absolute -right-32 -bottom-52 size-105 rounded-full bg-primary/12 blur-[140px]" />

        <div className="absolute top-[30%] -left-24 h-64 w-44 rotate-12 rounded-4xl border border-primary/8 bg-primary/2.5 backdrop-blur-sm" />
        <div className="absolute top-[18%] -right-24 h-72 w-48 -rotate-12 rounded-4xl border border-primary/8 bg-primary/2.5 backdrop-blur-sm" />
      </div>

      <div className="relative z-10 flex w-full max-w-2xl flex-col gap-y-4">
        <AdminHeader />
      </div>
    </main>
  );
}
