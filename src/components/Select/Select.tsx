import styles from "./Select.module.css"
import React, {ChangeEvent, useEffect, useState, useRef} from "react"

export interface OptionProps {
    label: string
    value: string
}

interface SelectProps {
    isMultiSelect: boolean
    options: OptionProps[]
    onSelectionChange: (selected: string[]) => void
    placeholder?: string
}

const Select = ({options, isMultiSelect, onSelectionChange, placeholder}: SelectProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedOptions, setSelectedOptions] = useState<string[]>([])
    const [inputValue, setInputValue] = useState('')
    const [isCollapsed, setIsCollapsed] = useState(false)
    const isFirstRender = useRef(true)
    const containerRef = useRef<HTMLDivElement | null>(null)

    const filteredOptions = options.filter(option =>
        option.label.toLowerCase().includes(inputValue.toLowerCase())
    )

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false
            return
        }
        onSelectionChange(selectedOptions)
    }, [selectedOptions])

    useEffect(() => {
        if (isFirstRender.current) return

        setInputValue('')
        setSelectedOptions([])
    }, [isMultiSelect])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const container = containerRef.current
            if (!container) return

            const target = event.target
            if (!target || !(target instanceof Node)) return

            if (!container.contains(target)) {
                setIsOpen(false)
                updateInputValue()
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [selectedOptions])

    const updateInputValue = () => {
        if (!isMultiSelect && selectedOptions.length === 1) {
            const selectedOption = options.find(opt => opt.value === selectedOptions[0])
            setInputValue(selectedOption?.label || '')
        } else {
            setInputValue('')
        }
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
        setIsOpen(true)
    }

    const handleOptionSelect = (option: OptionProps) => {
        if (!isMultiSelect) {
            setSelectedOptions([option.value])
            setInputValue(option.label)
            setIsOpen(false)
        }
    }

    const handleSelectAllClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setInputValue('')
        setSelectedOptions([...options.map((item) => item.value)])
    }
    const handleDeSelectAllClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setInputValue('')
        setSelectedOptions([])
    }

    const multiSelectChange = (e: ChangeEvent<HTMLInputElement>, value: string) => {
        e.preventDefault()
        setSelectedOptions((prevState) => {
            if (e.target.checked) {
                return [...prevState, value]
            } else {
                return prevState.filter(v => v !== value)
            }
        })
    }


    return (
        <div className={styles.container} ref={containerRef} data-testid="select-container">
            {!isMultiSelect ? <div className={styles.inputContainer}>
                <input
                    type="text"
                    className={styles.input}
                    value={inputValue}
                    onChange={handleInputChange}
                    onFocus={() => setIsOpen(true)}
                    placeholder={placeholder}
                />
            </div> : null}

            {isMultiSelect ? (
                <div className={styles.multiSelectContainer}>
                    <div>
                        <button onClick={handleSelectAllClick} data-testid="select-all-button">Select All</button>
                        <button onClick={handleDeSelectAllClick} data-testid="deselect-all-button">Deselect All</button>
                    </div>
                    <button
                        type="button"
                        onClick={() => setIsCollapsed(prev => !prev)}
                        className={styles.collapseButton}
                    >
                        {isCollapsed ? 'Show' : 'Collapse'}
                    </button>
                    {!isCollapsed && (
                        <ul>
                            {filteredOptions.map((item) => {
                                const id = `inner_multi_select_item_id_${item.value}`
                                return (
                                    <li key={item.value}>
                                        <input
                                            id={id}
                                            type="checkbox"
                                            onChange={(e) => multiSelectChange(e, item.value)}
                                            checked={selectedOptions.includes(item.value)}
                                        />
                                        <label htmlFor={id}>{item.label}</label>
                                    </li>
                                )
                            })}
                        </ul>
                    )}
                </div>
            ) : (
                isOpen && (
                    <ul className={styles.dropdown} data-testid="options-dropdown">
                        {filteredOptions.map((option) => (
                            <li
                                key={option.value}
                                className={styles.option}
                                onClick={() => handleOptionSelect(option)}
                            >
                                {option.label}
                            </li>
                        ))}
                    </ul>
                )
            )}
        </div>
    )
}

export default Select