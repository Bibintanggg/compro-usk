import { PropsWithChildren, useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { router } from '@inertiajs/react'

export default function AosProvider({ children }: PropsWithChildren) {
    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
            easing: 'ease-in-out',
        })

        const unlisten = router.on('navigate', () => {
            AOS.refreshHard()
        })

        return () => unlisten()
    }, [])

    return <>{children}</>
}
