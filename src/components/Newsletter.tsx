import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Reveal } from './motion.tsx';

const STORAGE_KEY = 'shopkart-newsletter';

const newsletterSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

type NewsletterFormData = z.infer<typeof newsletterSchema>;

function readStoredSignup(): string | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed === 'object' && parsed !== null && 'email' in parsed) {
      const email = (parsed as { email: unknown }).email;
      return typeof email === 'string' ? email : null;
    }
    return null;
  } catch {
    return null;
  }
}

export default function Newsletter() {
  const [subscribedEmail, setSubscribedEmail] = useState<string | null>(() =>
    readStoredSignup(),
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
  });

  const onSubmit = (data: NewsletterFormData) => {
    const existing = readStoredSignup();
    if (existing) {
      setSubscribedEmail(existing);
      return;
    }
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ email: data.email, date: new Date().toISOString() }),
      );
    } catch {
      // Storage unavailable (e.g. private mode): still show the success state
      // for this visit rather than blocking the signup.
    }
    setSubscribedEmail(data.email);
  };

  return (
    <Reveal>
      <section className="rounded-[2rem] bg-creamdark px-6 py-12 text-center sm:px-10">
        {subscribedEmail ? (
          <>
            <h2 className="font-display text-3xl font-bold text-ink">You&rsquo;re in!</h2>
            <p className="mx-auto mt-3 max-w-md text-stone-600">
              Your 10% code is <span className="font-bold text-clay">WELCOME10</span> —
              use it at checkout.
            </p>
            <p className="mt-2 text-sm text-stone-500">
              Signed up as {subscribedEmail}. We&rsquo;ll only email you about new
              arrivals and members-only offers.
            </p>
          </>
        ) : (
          <>
            <h2 className="font-display text-3xl font-bold text-ink">
              Get 10% off your first order
            </h2>
            <p className="mx-auto mt-3 max-w-md text-stone-600">
              Join our newsletter for new arrivals and members-only offers.
            </p>
            <form
              onSubmit={(event) => void handleSubmit(onSubmit)(event)}
              noValidate
              className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row"
            >
              <div className="flex-1 text-left">
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  {...register('email')}
                  aria-invalid={errors.email ? true : undefined}
                  aria-describedby={errors.email ? 'newsletter-email-error' : undefined}
                  className="w-full rounded-full border border-stone-300 bg-white px-5 py-3 text-sm text-ink placeholder:text-stone-400 focus:border-clay focus:outline-none focus:ring-2 focus:ring-clay/30"
                />
                {errors.email && (
                  <p id="newsletter-email-error" role="alert" className="mt-2 text-sm text-clay">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition hover:bg-stone-800 disabled:opacity-60"
              >
                Subscribe
              </button>
            </form>
          </>
        )}
      </section>
    </Reveal>
  );
}
