import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Imprint — utxo AG",
};

export default function ImprintPage() {
  return (
    <main className="px-6 py-32">
      <div className="max-w-[640px] mx-auto">
        <h1 className="text-[36px] font-extrabold tracking-[-1.5px] leading-[1.1] mb-12">
          Imprint
        </h1>

        <div className="text-[15px] text-[#555] leading-[1.75]">
          <section>
            <h2 className="text-[13px] font-mono uppercase tracking-[0.1em] text-[#999] mb-3">
              Company
            </h2>
            <p className="font-semibold text-[#111]">utxo AG</p>
            <p>Dammstrasse 16</p>
            <p>6300 Zug</p>
            <p>Switzerland</p>
          </section>

          <hr className="my-8 border-[#eee]" />

          <section>
            <h2 className="text-[13px] font-mono uppercase tracking-[0.1em] text-[#999] mb-3">
              Commercial Register
            </h2>
            <p>Handelsregister-Nummer CH-400.3.450.669-8</p>
          </section>

          <hr className="my-8 border-[#eee]" />

          <section>
            <h2 className="text-[13px] font-mono uppercase tracking-[0.1em] text-[#999] mb-3">
              Represented by
            </h2>
            <p>Patrick Tobler, CEO</p>
          </section>

          <hr className="my-8 border-[#eee]" />

          <section>
            <h2 className="text-[13px] font-mono uppercase tracking-[0.1em] text-[#999] mb-3">
              Contact
            </h2>
            <p>
              <a href="mailto:business@utxo.ag" className="underline underline-offset-2 hover:text-[#111] transition-colors">
                business@utxo.ag
              </a>
            </p>
          </section>

          <hr className="my-8 border-[#eee]" />

          <section>
            <h2 className="text-[13px] font-mono uppercase tracking-[0.1em] text-[#999] mb-3">
              Disclaimer
            </h2>
            <p>
              The author assumes no liability for the correctness, accuracy, timeliness, reliability, or completeness of the information provided. Liability claims against the author for damages of a material or immaterial nature arising from access to, use or non-use of the published information, from misuse of the connection, or from technical faults are excluded.
            </p>
            <p className="mt-3">
              All offers are non-binding. The author expressly reserves the right to change, supplement, or delete parts of the pages or the entire offering without prior notice, or to temporarily or permanently cease publication.
            </p>
          </section>

          <hr className="my-8 border-[#eee]" />

          <section>
            <h2 className="text-[13px] font-mono uppercase tracking-[0.1em] text-[#999] mb-3">
              Liability for Links
            </h2>
            <p>
              References and links to third-party websites are outside our area of responsibility. Any responsibility for such websites is declined. Access to and use of such websites is at the user&apos;s own risk.
            </p>
          </section>

          <hr className="my-8 border-[#eee]" />

          <section>
            <h2 className="text-[13px] font-mono uppercase tracking-[0.1em] text-[#999] mb-3">
              Copyright
            </h2>
            <p>
              The copyright and all other rights to content, images, photos, or other files on this website belong exclusively to utxo AG or the specifically named rights holders. Written consent of the copyright holder must be obtained in advance for the reproduction of any elements.
            </p>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-[#eee]">
          <a href="/" className="text-[13px] text-[#999] hover:text-[#111] transition-colors">
            &larr; Back to home
          </a>
        </div>
      </div>
    </main>
  );
}
