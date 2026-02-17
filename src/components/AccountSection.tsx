import { useState } from "react";

import type { AccountItem } from "../types/wedding";

type AccountSectionProps = {
  accounts: AccountItem[];
};

function AccountSection({ accounts }: AccountSectionProps) {
  const [copiedAccountId, setCopiedAccountId] = useState<string | null>(null);
  const [copyErrorAccountId, setCopyErrorAccountId] = useState<string | null>(null);

  const handleCopyAccount = async (account: AccountItem) => {
    try {
      await navigator.clipboard.writeText(`${account.bank} ${account.number}`);
      setCopiedAccountId(account.id);
      setCopyErrorAccountId(null);
      window.setTimeout(() => setCopiedAccountId(null), 2000);
    } catch {
      setCopyErrorAccountId(account.id);
      window.setTimeout(() => setCopyErrorAccountId(null), 2000);
    }
  };

  return (
    <section className="account-section">
      <h3>Gift Accounts</h3>
      {accounts.map((account) => (
        <div key={account.id} className="account-card">
          <div className="account-item">
            <div className="account-header">
              <p className="account-label">
                <strong>{account.role}</strong>
              </p>
              <p className="account-name">{account.name}</p>
            </div>
            <p className="account-number">{`${account.bank} ${account.number}`}</p>
            <button
              className="copy-btn"
              onClick={() => void handleCopyAccount(account)}
              type="button"
              aria-label={`Copy account for ${account.role}`}
            >
              {copiedAccountId === account.id
                ? "Copied"
                : copyErrorAccountId === account.id
                  ? "Copy failed"
                  : "Copy account"}
            </button>
          </div>
        </div>
      ))}
    </section>
  );
}

export default AccountSection;
