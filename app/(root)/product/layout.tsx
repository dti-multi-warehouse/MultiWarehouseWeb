export default function ProductLayout(
    {children}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <div className="z-0 p-10">{children}</div>
        </div>
    );
}
