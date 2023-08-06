import { NextRequest } from "next/server";

export const WISDOM_URL = "wisdom.zeabur.app";
const PROTOCOL = "https";
const BASEURL = `${PROTOCOL}://${WISDOM_URL}`;

export async function requestSendEmail(email:string) {
  const controller = new AbortController();

  const timeoutId = setTimeout(() => {
    controller.abort();
  }, 10 * 60 * 1000);


  const fetchUrl = `${BASEURL}/wisdom/api/user/sendEmail?email=`+ email;

  try {
    const res = await fetch(fetchUrl);

    if (res.status === 401) {
      // to prevent browser prompt for credentials
      const newHeaders = new Headers(res.headers);
      newHeaders.delete("www-authenticate");
      return new Response(res.body, {
        status: res.status,
        statusText: res.statusText,
        headers: newHeaders,
      });
    }

    return res;
  } finally {
    clearTimeout(timeoutId);
  }
}
