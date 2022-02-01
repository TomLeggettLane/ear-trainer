




var resetStats;

function test() {
    const [stats, setStats] = useState(5);

    resetStats = () => {
        setStats(0);
    }
}

export {test, resetStats};