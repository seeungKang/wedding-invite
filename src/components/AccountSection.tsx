import { useMemo, useState } from "react";

import type { AccountGroup, AccountItem } from "../types/wedding";

type AccountSectionProps = {
  groups: AccountGroup[];
};

type ToastState = {
  text: string;
  type: "success" | "error";
} | null;

function AccountSection({ groups }: AccountSectionProps) {
  const [openItemMap, setOpenItemMap] = useState<Record<string, boolean>>(() => {
    const firstOpenMap: Record<string, boolean> = {};
    for (const group of groups) {
      const firstItem = group.items[0];
      if (firstItem !== undefined) {
        firstOpenMap[firstItem.id] = true;
      }
    }
    return firstOpenMap;
  });
  const [toastState, setToastState] = useState<ToastState>(null);

  const allItems = useMemo(() => groups.flatMap((group) => group.items), [groups]);

  const handleToggleItem = (item: AccountItem) => {
    setOpenItemMap((previous) => ({
      ...previous,
      [item.id]: !previous[item.id],
    }));
  };

  const handleCopy = async (item: AccountItem) => {
    try {
      await navigator.clipboard.writeText(item.copyValue);
      setToastState({ text: "Account number copied.", type: "success" });
    } catch {
      setToastState({
        text: "Copy failed. Please press and hold to copy manually.",
        type: "error",
      });
    }

    window.setTimeout(() => setToastState(null), 2000);
  };

  return (
    <section className="section accounts" id="account">
      <div className="account-icon" aria-hidden="true">
        ⌁
      </div>
      <h2 className="section-title">Gift Accounts</h2>
      <p className="section-description">
        Your kind support and thoughtful message are deeply appreciated.
      </p>

      {groups.map((group) => (
        <article key={group.side} className="account-group-card">
          <p className="account-group-title">{group.title}</p>
          {group.items.map((item) => {
            const isOpen = openItemMap[item.id] ?? false;

            return (
              <div key={item.id} className="account-item-wrap">
                <button
                  className="account-toggle"
                  onClick={() => handleToggleItem(item)}
                  aria-expanded={isOpen}
                  aria-controls={`account-panel-${item.id}`}
                  type="button"
                >
                  <span className="account-role">{item.roleLabel}</span>
                  <span className="account-owner">{item.name}</span>
                  <span className="account-chevron">{isOpen ? "⌃" : "⌄"}</span>
                </button>
                {isOpen ? (
                  <div id={`account-panel-${item.id}`} className="account-panel">
                    <p className="account-meta">{item.bankName}</p>
                    <p className="account-number">{item.accountNumber}</p>
                    <p className="account-meta">{`Holder: ${item.holderName}`}</p>
                    <button
                      className="outline-button small"
                      onClick={() => void handleCopy(item)}
                      type="button"
                    >
                      Copy Account
                    </button>
                  </div>
                ) : null}
              </div>
            );
          })}
        </article>
      ))}

      <p className="sr-only" aria-live="polite">
        {toastState?.text ?? ""}
      </p>
      {toastState !== null ? (
        <div className={`toast ${toastState.type}`}>{toastState.text}</div>
      ) : null}

      <p className="sr-only">{`Total accounts: ${allItems.length}`}</p>
    </section>
  );
}

export default AccountSection;
