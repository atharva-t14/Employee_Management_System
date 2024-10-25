import { useState, useEffect } from 'react';

const useEmployeeId = () => {
    const [employeeId, setEmployeeId] = useState(null);

    useEffect(() => {
        const storedEmployeeId = localStorage.getItem('employeeId');
        if (storedEmployeeId) {
            setEmployeeId(storedEmployeeId);
        }
    }, []);

    return employeeId;
};

export default useEmployeeId;