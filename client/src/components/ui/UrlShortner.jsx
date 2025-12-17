import { useState } from "react";
import Button from "./Button";
import Input from "./Input";
import { urlServices } from "../../api";
import { Link } from "react-router";
const UrlShortner = () => {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await urlServices.createShort(longUrl);
      setShortUrl(`http:localhost:8000/${res.shortUrl}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };
  return (
    <section className="flex flex-col items-center justify-center px-4 py-20 bg-white">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Shorten Your Long URLs
      </h1>
      <p className="text-gray-600 mb-8 text-center max-w-xl">
        Paste your long URL below and get a short, shareable link in seconds.
      </p>

      <form onSubmit={handleSubmit} className="w-full max-w-xl flex gap-2">
        <Input
          size="lg"
          type="url"
          required
          placeholder="Enter your long URL here..."
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
        />
        <Button type="submit">Shorten</Button>
      </form>

      {shortUrl && (
        <div className="mt-6 w-full max-w-xl bg-gray-100 p-4 rounded-md flex items-center justify-between">
          <Link
            to={`${shortUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 font-medium truncate"
          >
            {shortUrl}
          </Link>
          <Button variant="secondary" onClick={handleCopy}>
            {copied ? "Copied!" : "Copy"}
          </Button>
        </div>
      )}
    </section>
  );
};

export default UrlShortner;
