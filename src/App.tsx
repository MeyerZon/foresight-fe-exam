import './App.css'
import Select from "./components/Select/Select.tsx"
import { useState, FormEvent } from "react"
import { berryOptions, toppingsOptions } from "./data/data.tsx"

interface OrderData {
    flavors: string[]
    size: string
    toppings: string[]
    name: string
    notes?: string
}



function App() {
    const [isMultiSelect, setIsMultiSelect] = useState<boolean>(true)
    const [selectedFlavors, setSelectedFlavors] = useState<string[]>([])
    const [size, setSize] = useState<string>('medium')
    const [toppings, setToppings] = useState<string[]>([])
    const [name, setName] = useState<string>('')
    const [notes, setNotes] = useState<string>('')

    const handleFlavorChange = (selectionResults: string[]) => {
        setSelectedFlavors(selectionResults)
    }

    const handleToppingsChange = (selectionResults: string[]) => {
        setToppings(selectionResults)
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()

        const orderData: OrderData = {
            flavors: selectedFlavors,
            size,
            toppings,
            name,
            notes: notes || undefined
        }

        console.log('Order Details:', orderData)
    }

    return (
        <main>
            <form onSubmit={handleSubmit}>
                <h1>Ice Cream Order</h1>

                <div className="form-group">
                    <label htmlFor="name">Your Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Ice Cream Flavors:</label>
                    <Select
                        isMultiSelect={isMultiSelect}
                        options={berryOptions}
                        onSelectionChange={handleFlavorChange}
                        placeholder="Select flavor(s)"
                    />
                    <div className="checkbox-wrapper">
                        <input
                            type="checkbox"
                            id="isMultiSelect"
                            checked={isMultiSelect}
                            onChange={() => setIsMultiSelect(prev => !prev)}
                        />
                        <label htmlFor="isMultiSelect">Multiple Flavors</label>
                    </div>
                </div>

                <div className="form-group">
                    <label>Size:</label>
                    <div className="radio-group">
                        <div>
                            <input
                                type="radio"
                                id="small"
                                name="size"
                                value="small"
                                checked={size === 'small'}
                                onChange={(e) => setSize(e.target.value)}
                            />
                            <label htmlFor="small">Small</label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                id="medium"
                                name="size"
                                value="medium"
                                checked={size === 'medium'}
                                onChange={(e) => setSize(e.target.value)}
                            />
                            <label htmlFor="medium">Medium</label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                id="large"
                                name="size"
                                value="large"
                                checked={size === 'large'}
                                onChange={(e) => setSize(e.target.value)}
                            />
                            <label htmlFor="large">Large</label>
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <label>Topping:</label>
                    <Select
                        isMultiSelect={true}
                        options={toppingsOptions}
                        onSelectionChange={handleToppingsChange}
                        placeholder="Select topping(s)"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="notes">Special Notes:</label>
                    <textarea
                        id="notes"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Any allergies or special requests?"
                    />
                </div>

                <button type="submit">Place Order</button>
            </form>
        </main>
    )
}

export default App