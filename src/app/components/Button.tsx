
'use client'

interface Props{
    buttonText: string
    callback: () => void
}

export const Button = (children : Props) =>{

    return (
        <span className="hidden sm:block">
            <button
                onClick={children.callback}
                type="button"
                className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
                {children.buttonText}
            </button>
        </span>
    )
}