import { useEffect, useState } from "react";
import { Download, Share, X } from "lucide-react";
import logoIcon from "@/assets/logo-icon.png";

type BIPEvent = Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: string }> };

const KEY = "inservice-install-dismissed";
const WEEK = 7 * 24 * 60 * 60 * 1000;

export function InstallPrompt() {
  const [evt, setEvt] = useState<BIPEvent | null>(null);
  const [ios, setIos] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (navigator as unknown as { standalone?: boolean }).standalone === true;
    if (standalone || window.self !== window.top) return;
    const last = Number(localStorage.getItem(KEY) || 0);
    if (Date.now() - last < WEEK) return;

    const isIos = /iphone|ipad|ipod/i.test(navigator.userAgent);
    if (isIos) {
      setIos(true);
      const t = setTimeout(() => setShow(true), 2500);
      return () => clearTimeout(t);
    }
    const onPrompt = (e: Event) => {
      e.preventDefault();
      setEvt(e as BIPEvent);
      setShow(true);
    };
    const onInstalled = () => setShow(false);
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  const dismiss = () => {
    localStorage.setItem(KEY, String(Date.now()));
    setShow(false);
  };

  const install = async () => {
    if (!evt) return;
    await evt.prompt();
    await evt.userChoice;
    setEvt(null);
    setShow(false);
  };

  if (!show) return null;

  return (
    <div dir="rtl" className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-md">
      <div className="surface-card flex items-start gap-3 rounded-3xl border border-border bg-card p-4 shadow-lg">
        <img src={logoIcon} alt="" width={44} height={44} className="size-11 shrink-0" />
        <div className="flex-1">
          <p className="text-sm font-bold text-foreground">ثبّت تطبيق inservice</p>
          {ios ? (
            <p className="mt-1 text-xs leading-6 text-muted-foreground">
              اضغط زر المشاركة <Share className="inline size-3.5" strokeWidth={1.5} /> في Safari ثم اختر
              «إضافة إلى الشاشة الرئيسية».
            </p>
          ) : (
            <p className="mt-1 text-xs leading-6 text-muted-foreground">
              افتح المتجر من شاشتك الرئيسية بنقرة واحدة، أسرع وبدون شريط المتصفح.
            </p>
          )}
          {!ios && (
            <button
              onClick={install}
              className="mt-3 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-xs font-bold text-primary-foreground"
            >
              <Download className="size-4" strokeWidth={1.5} />
              تثبيت التطبيق
            </button>
          )}
        </div>
        <button onClick={dismiss} aria-label="إغلاق" className="text-muted-foreground hover:text-foreground">
          <X className="size-4" strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}
