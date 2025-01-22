
'use client'

interface Props{
    buttonText: string
    position?: string
    callback: () => void
}

export const Button = (children : Props) =>{

    return (
        <span>
            <button
                onClick={children.callback}
                type="button"
                className={`${children.position ?? 'inline-flex items-center'} text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
            >
                {children.buttonText}
            </button>
        </span>
    )
}