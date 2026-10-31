import { useEffect, useMemo, useRef, useState } from "react";

import type { AccountGroup, AccountItem } from "../types/wedding";

type AccountSectionProps = {
  groups: AccountGroup[];
};

type ToastState = {
  itemId: string;
  text: string;
  type: "success" | "error";
} | null;

function AccountSection({ groups }: AccountSectionProps) {
  const [openItemMap, setOpenItemMap] = useState<Record<string, boolean>>({});
  const [toastState, setToastState] = useState<ToastState>(null);
  const copyTimerRef = useRef<number>();

  useEffect(() => () => window.clearTimeout(copyTimerRef.current), []);

  const allItems = useMemo(() => groups.flatMap((group) => group.items), [groups]);

  const handleToggleItem = (item: AccountItem) => {
    if (!item.accountNumber || !item.bankName) {
      return;
    }
    setOpenItemMap((previous) => ({
      ...previous,
      [item.id]: !previous[item.id],
    }));
  };

  const handleCopy = async (item: AccountItem) => {
    if (!item.accountNumber || !item.copyValue) {
      return;
    }
    window.clearTimeout(copyTimerRef.current);
    try {
      await navigator.clipboard.writeText(item.copyValue);
      setToastState({ itemId: item.id, text: "계좌번호가 복사되었습니다.", type: "success" });
    } catch {
      setToastState({
        itemId: item.id,
        text: "복사에 실패했습니다. 길게 눌러 복사해 주세요.",
        type: "error",
      });
    }

    copyTimerRef.current = window.setTimeout(() => setToastState(null), 2500);
  };

  return (
    <section className="section accounts" id="account">
      <h2 className="section-title">마음 전하실 곳</h2>
      <div className="section-rule" />
      <p className="section-description">
        소중한 마음으로 보내주시는 축복에 감사드립니다.
      </p>

      {groups.map((group) => (
        <article key={group.side} className="account-group-card">
          <p className="account-group-title">{group.title}</p>
          {group.items.map((item) => {
            const isAvailable = Boolean(item.accountNumber && item.bankName);
            const isOpen = isAvailable && (openItemMap[item.id] ?? false);
            const isCopied = toastState?.type === "success" && toastState.itemId === item.id;

            return (
              <div key={item.id} className="account-item-wrap">
                <button
                  className="account-toggle"
                  onClick={() => handleToggleItem(item)}
                  disabled={!isAvailable}
                  aria-expanded={isAvailable ? isOpen : undefined}
                  aria-controls={isAvailable ? `account-panel-${item.id}` : undefined}
                  aria-label={isAvailable ? `${item.roleLabel} ${item.name} 계좌 ${isOpen ? "닫기" : "보기"}` : undefined}
                  type="button"
                >
                  <span className="account-role">{item.roleLabel}</span>
                  <span className="account-owner">{item.name}</span>
                  {isAvailable ? (
                    <span className="account-chevron" aria-hidden="true">▼</span>
                  ) : (
                    <span className="account-status">준비 중</span>
                  )}
                </button>
                {isOpen ? (
                  <div id={`account-panel-${item.id}`} className="account-panel">
                    <p className="account-meta">{item.bankName}<span aria-hidden="true"> · </span>{item.holderName}</p>
                    <div className="account-number-row">
                    <p className="account-number">{item.accountNumber}</p>
                    <button
                      className="account-copy"
                      aria-label={`${item.name} 계좌번호 ${isCopied ? "복사 완료" : "복사"}`}
                      onClick={() => void handleCopy(item)}
                      type="button"
                    >
                      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        {isCopied ? <path d="M5 12L10 17L19 7" /> : <><rect x="9" y="9" width="11" height="12" rx="1" /><path d="M6 16H4V3H15V6" /></>}
                      </svg>
                      <span>{isCopied ? "복사됨" : "복사"}</span>
                    </button>
                    </div>
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
      {toastState?.type === "error" ? (
        <p className="account-copy-error" role="alert">{toastState.text}</p>
      ) : null}

      <p className="sr-only">{`계좌 개수 ${allItems.length}개`}</p>
    </section>
  );
}

export default AccountSection;
