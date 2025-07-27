// DateRangePicker.tsx
import { useState } from 'react';
import { DateRange, RangeKeyDict, Range } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import Button from '../../ui/button/Button'


export interface DateRangePickerProps {
    isOpen: boolean,
    onClose: (start: Date | null, end: Date | null) => void,
}

function DateRangePicker(props: DateRangePickerProps) {
    if (!props.isOpen) return null;

    const [range, setRange] = useState<Range>({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    });

    const handleChange = (ranges: RangeKeyDict) => {
        setRange(ranges.selection); // fully typed, no `any`
    };

    const handleDone = () => {
        props.onClose(range.startDate ?? null, range.endDate ?? null);
    };


    return (
        <div className="h-screen w-screen flex items-center justify-center absolute z-10 left-[50%] translate-x-[-50%] border rounded backdrop-blur-[2px]">

            <div className='bg-whiten-secondary w-fit p-[30px] rounded-4xl border border-whiten-accent/30'>
                <DateRange
                    editableDateInputs={true}
                    onChange={handleChange}
                    moveRangeOnFirstSelection={false}
                    ranges={[range]}
                    maxDate={new Date()}
                    rangeColors={['#D4AF37']}
                    className='!bg-whiten-secondary'
                />
                <div className="flex justify-end mt-2">
                    <Button
                        onClick={handleDone}
                        className="whiten-btn"
                        children='Filter'
                    />
                </div>
            </div>
        </div>
    );
}

export default DateRangePicker;
