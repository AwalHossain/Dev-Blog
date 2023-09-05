import { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { setFilterBy, setSortBy } from "../../features/filter/filterSlice";

export default function Sidebar() {

    const dispatch = useAppDispatch();

    const [selectedValue, setSelectedValue] = useState('all');

    const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(setSortBy(e.target.value));
    };

    const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setFilterBy(e.target.value));
    };

    return (
        <aside>
            <div className="sidebar-items">
                <div className="sidebar-content">
                    <h4>Sort</h4>
                    <select
                        onChange={handleSort}
                        name="sort"
                        id="lws-sort"
                        className="w-full max-w-[150px] border-2 rounded-md text-gray-500"
                    >
                        <option value="">Default</option>
                        <option value="newest">Newest</option>
                        <option value="most_liked">Most Liked</option>
                    </select>
                </div>
                <div className="sidebar-content">
                    <h4>Filter</h4>
                    <div className="radio-group">
                        <div>
                            <input
                                type="radio"
                                name="filter"
                                id="lws-all"
                                className="radio"
                                onChange={handleFilter}
                                onClick={() => setSelectedValue('all')}
                                value="all"
                                checked={selectedValue === 'all'} // Check if this radio button is selected
                            />
                            <label htmlFor="lws-all">All</label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                name="filter"
                                id="lws-saved"
                                className="radio"
                                onChange={handleFilter}
                                onClick={() => setSelectedValue('saved')}
                                value="saved"
                                checked={selectedValue === 'saved'} // Check if this radio button is selected
                            />
                            <label htmlFor="lws-saved">Saved</label>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    )
}
