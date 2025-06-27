export function Gradient() {
    return (
        <>
            {/* Vignette */}
            {/* <div className="fixed top-1/2 left-1/2 w-screen h-auto aspect-square -translate-x-1/2 -translate-y-1/2 pointer-events-none rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255)_60%,rgba(255,255,255,.2)_100%)] " /> */}
            {/* gradient */}
            <div className="z-10 fixed top-1/2 left-1/2 w-screen aspect-square h-full -translate-x-1/2 -translate-y-1/2 pointer-events-none backdrop-blur-xs [mask-image:radial-gradient(circle_at_center,rgba(0,0,0,0)_60%,rgba(0,0,0,1)_97%)]"/>

            <div className="fixed top-1/2 left-1/2 w-screen aspect-square h-full -translate-x-1/2 -translate-y-1/2 pointer-events-none z-40 
            bg-[radial-gradient(circle_at_center,rgba(255,255,255,0)_60%,rgba(255,255,255,0.8)_85%,rgba(255,255,255,1)_97%)]" />
            {/* noise */}
            <div className="fixed inset-0 pointer-events-none noise" />
            {/* Blur */}

        </>
    )
}
