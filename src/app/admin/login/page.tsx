import { signIn } from "@/app/admin/actions";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center bg-charcoal px-6 text-white">
      <div className="w-full max-w-sm">
        <p className="font-display text-2xl font-bold">
          Content<span className="font-script text-3xl font-normal text-yellow"> Casa</span>
        </p>
        <h1 className="mt-6 text-xl font-semibold">Admin sign in</h1>
        <p className="mt-1 text-sm text-white/60">
          Manage every section of the website from here.
        </p>

        <form action={signIn} className="mt-8 space-y-4">
          <label className="block">
            <span className="text-sm text-white/70">Email</span>
            <input
              name="email"
              type="email"
              required
              className="mt-1.5 w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm outline-none focus:border-yellow"
            />
          </label>
          <label className="block">
            <span className="text-sm text-white/70">Password</span>
            <input
              name="password"
              type="password"
              required
              className="mt-1.5 w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm outline-none focus:border-yellow"
            />
          </label>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            className="w-full rounded-full bg-yellow px-6 py-3 text-sm font-semibold text-charcoal transition-transform hover:scale-[1.02]"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
