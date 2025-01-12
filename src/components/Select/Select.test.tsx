import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Select from './Select';
import type { OptionProps } from './Select';

const mockOptions: OptionProps[] = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
];

describe('Select Component', () => {
    const mockOnSelectionChange = jest.fn();

    beforeEach(() => {
        mockOnSelectionChange.mockClear();
    });

    describe('Single Select Mode', () => {
        const renderSingleSelect = (props = {}) => {
            return render(
                <Select
                    options={mockOptions}
                    isMultiSelect={false}
                    onSelectionChange={mockOnSelectionChange}
                    {...props}
                />
            );
        };

        it('renders with placeholder', () => {
            renderSingleSelect({ placeholder: 'Test placeholder' });
            expect(screen.getByPlaceholderText('Test placeholder')).toBeInTheDocument();
        });

        it('opens dropdown on input focus', async () => {
            renderSingleSelect();
            const input = screen.getByRole('textbox');
            await userEvent.click(input);

            mockOptions.forEach(option => {
                expect(screen.getByText(option.label)).toBeInTheDocument();
            });
        });

        it('filters options based on input', async () => {
            renderSingleSelect();
            const input = screen.getByRole('textbox');

            await userEvent.type(input, 'Option 1');

            expect(screen.getByText('Option 1')).toBeInTheDocument();
            expect(screen.queryByText('Option 2')).not.toBeInTheDocument();
        });

        it('selects option and calls onSelectionChange', async () => {
            renderSingleSelect();
            const input = screen.getByRole('textbox');

            await userEvent.click(input);
            await userEvent.click(screen.getByText('Option 1'));

            expect(mockOnSelectionChange).toHaveBeenCalledWith(['option1']);
            expect(input).toHaveValue('Option 1');
        });

        it('closes dropdown when clicking outside', async () => {
            renderSingleSelect();
            const input = screen.getByRole('textbox');

            await userEvent.click(input);
            expect(screen.getByText('Option 1')).toBeInTheDocument();

            await userEvent.click(document.body);
            expect(screen.queryByText('Option 1')).not.toBeInTheDocument();
        });
    });

    describe('Multi Select Mode', () => {
        const renderMultiSelect = (props = {}) => {
            return render(
                <Select
                    options={mockOptions}
                    isMultiSelect={true}
                    onSelectionChange={mockOnSelectionChange}
                    {...props}
                />
            );
        };

        it('renders select all and deselect all buttons', () => {
            renderMultiSelect();
            expect(screen.getByTestId('select-all-button')).toBeInTheDocument();
            expect(screen.getByTestId('deselect-all-button')).toBeInTheDocument();
        });

        it('handles select all button click', async () => {
            renderMultiSelect();
            await userEvent.click(screen.getByTestId('select-all-button'));

            expect(mockOnSelectionChange).toHaveBeenCalledWith(
                expect.arrayContaining(['option1', 'option2', 'option3'])
            );
        });

        it('handles deselect all button click', async () => {
            renderMultiSelect();

            await userEvent.click(screen.getByTestId('select-all-button'));
            await userEvent.click(screen.getByTestId('deselect-all-button'));

            expect(mockOnSelectionChange).toHaveBeenLastCalledWith([]);
        });

        it('handles individual checkbox selections', async () => {
            renderMultiSelect();

            await userEvent.click(screen.getByLabelText('Option 1'));
            expect(mockOnSelectionChange).toHaveBeenCalledWith(['option1']);
        });

        it('handles collapse/expand functionality', async () => {
            renderMultiSelect();

            expect(screen.getByLabelText('Option 1')).toBeInTheDocument();
            await userEvent.click(screen.getByRole('button', { name: /collapse/i }));
            expect(screen.queryByLabelText('Option 1')).not.toBeInTheDocument();
        });

        it('maintains selected state after collapse/expand', async () => {
            renderMultiSelect();

            await userEvent.click(screen.getByLabelText('Option 1'));
            await userEvent.click(screen.getByRole('button', { name: /collapse/i }));
            await userEvent.click(screen.getByRole('button', { name: /show/i }));

            const checkbox = screen.getByLabelText('Option 1') as HTMLInputElement;
            expect(checkbox.checked).toBe(true);
        });
    });
});