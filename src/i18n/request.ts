import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as "en" | "de")) {
    locale = routing.defaultLocale;
  }

  const messages = (await import(`../../messages/${locale}.json`)).default;

  let legalMessages = {};
  try {
    const privacy = (await import(`../../messages/${locale}/privacy.json`))
      .default;
    const terms = (await import(`../../messages/${locale}/terms.json`)).default;
    const imprint = (await import(`../../messages/${locale}/imprint.json`))
      .default;
    const acceptableUse = (
      await import(`../../messages/${locale}/acceptable-use.json`)
    ).default;
    const dpa = (await import(`../../messages/${locale}/dpa.json`)).default;
    legalMessages = {
      Privacy: privacy.Privacy,
      Terms: terms.Terms,
      Imprint: imprint.Imprint,
      AcceptableUse: acceptableUse.AcceptableUse,
      DPA: dpa.DPA,
    };
  } catch {
    // Legal files may not exist yet — skip silently
  }

  return {
    locale,
    messages: { ...messages, ...legalMessages },
  };
});
