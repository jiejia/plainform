

export default function Block({children, className = ''}: { children: React.ReactNode , className?: string }) {
    return (
        <div className={`bg-content1 rounded-l px-4 py-4 ${className}`}>
            {children}
        </div>
    );
}
