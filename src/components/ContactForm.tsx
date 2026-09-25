import { useEffect } from 'react';

const GENIE_SCRIPT_SRC = 'https://genie-sandy-eight.vercel.app/embed.js';
const GENIE_FORM_ID = 'frm_wQ3ZhBSBj9L2zf5GK65gmY';

export function ContactForm() {
  useEffect(() => {
    if (document.querySelector(`script[src="${GENIE_SCRIPT_SRC}"]`)) return;
    const script = document.createElement('script');
    script.src = GENIE_SCRIPT_SRC;
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return <div data-genie-form={GENIE_FORM_ID} />;
}
