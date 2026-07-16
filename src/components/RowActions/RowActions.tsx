import { useState, useRef, useEffect } from "react";
import styles from "./RowActions.module.scss";

interface RowAction {
    label: string;
    onClick: () => void;
}

interface RowActionsProps {
    actions: RowAction[];
}

const RowActions = ({ actions }: RowActionsProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };
    }, []);

    return (
        <div
            ref={menuRef}
            className={styles["row-actions"]}
        >

            <button  className={styles["row-actions-button"]}
             type="button"
                onClick={() => setIsOpen(!isOpen)}
            
            >
      <svg>
        <rect x="0" y="0" fill="none" width="100%" height="100%" />
      </svg>
     ⋮
    </button>

            {isOpen && (
                <div className={styles["row-actions-menu"]}>

                    {actions.map((action, index) => (
                        <button
                            key={index}
                            type="button"
                            className={styles["row-actions-item"]}
                            onClick={() => {
                                action.onClick();
                                setIsOpen(false);
                            }}
                        >
                            {action.label}
                        </button>
                    ))}

                </div>
            )}


             
        </div>
    );
};

export default RowActions;