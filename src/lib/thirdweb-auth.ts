import { createAuth } from "thirdweb/auth";
import { privateKeyToAccount } from "thirdweb/wallets";
import { client } from "./thirdweb";
import { sha256 } from "thirdweb/utils";

// Derive a deterministic private key from the secret key for signing JWTs.
const secretHex = (
    process.env.THIRDWEB_SECRET_KEY
        ? sha256(process.env.THIRDWEB_SECRET_KEY as `0x${string}`)
        : "0x0000000000000000000000000000000000000000000000000000000000000001"
) as `0x${string}`;

const adminAccount = privateKeyToAccount({
    client,
    privateKey: secretHex,
});

// Use the root domain so cookies are shareable across all *.basalthq.com subdomains
const domain = process.env.NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN || "basalthq.com";

export const thirdwebAuth = createAuth({
    domain,
    adminAccount,
    client,
    login: {
        statement: "Sign in to BasaltHQ",
        uri: `https://${domain}`,
        resources: [`https://${domain}`],
        version: "1",
    },
});
