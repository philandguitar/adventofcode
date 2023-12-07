import { getFileContent } from "../../utils"

type Mapper = 'seedSoil' | 'soilFert' | 'fertWater' | 'waterLight' | 'lightTemp' | 'tempHum' | 'humLocation'
type State = 'seeds' | Mapper;
type Map = {
    from: number,
    to: number,
    range: number
}

export const a = (): number => {
    const { seeds, mapper } = getStateMapper();
    const mappingOrder = Object.entries(stateChanger);

    const mappedItems = seeds.map(seed => {
        let seedState = seed;
        mappingOrder.forEach(order => {
            seedState = mapToNewValue(seedState, mapper[order[1]])
        })
        return seedState
    })

    return Math.min(...mappedItems)
}

export const b = (): number => {
    const { seeds, mapper } = getStateMapper();
    const mappingOrder = Object.entries(stateChanger);

    const mainSeeds = seeds.reduce<number[]>((prev, curr, index) => {
        if (index % 2 === 0) prev.push(curr);
        return prev;
    }, []);

    const mappedItems = mainSeeds.map((seed, i) => {
        let minVal = Number.MAX_SAFE_INTEGER;
        for (let x = 0; x < seeds[i * 2 + 1]; x++) {
            if (x % 1000000 === 0) console.log("Seed ", i + 1, "/", mainSeeds.length, "; ", ((x / seeds[i * 2 + 1]) * 100).toFixed(2), "% (Value ", x, "/", seeds[i * 2 + 1], ")");

            let seedValue: number = seeds[i * 2] + x;
            mappingOrder.forEach(order => {
                seedValue = mapToNewValue(seedValue, mapper[order[1]])
            })

            minVal = Math.min(minVal, seedValue)
        }

        return minVal;
    })

    return Math.min(...mappedItems)
}

const stateChanger: Record<string, Mapper> = {
    "seed-to-soil map:": "seedSoil",
    "soil-to-fertilizer map:": "soilFert",
    "fertilizer-to-water map:": "fertWater",
    "water-to-light map:": "waterLight",
    "light-to-temperature map:": "lightTemp",
    "temperature-to-humidity map:": "tempHum",
    "humidity-to-location map:": "humLocation"
}

const getStateMapper = () => {
    const lines = getFileContent(import.meta.dir);
    let state: State = "seeds";

    let seeds: number[] = []
    const res: Record<Mapper, Map[]> = {
        fertWater: [],
        humLocation: [],
        lightTemp: [],
        seedSoil: [],
        soilFert: [],
        tempHum: [],
        waterLight: []
    }

    lines.forEach(line => {
        if (line === "") return;

        const newState = stateChanger[line];
        if (newState != null) {
            if (state !== "seeds") {
                res[state] = res[state].sort((a, b) => a.from - b.from)
            }
            state = newState;
            return;
        }

        if (state === "seeds") {
            const newSeeds = line.replace("seeds: ", "").split(" ");
            seeds = seeds.concat(newSeeds.map(seed => Number.parseInt(seed)));
        } else {
            const [to, from, range] = line.split(" ");

            res[state].push({
                from: Number.parseInt(from),
                to: Number.parseInt(to),
                range: Number.parseInt(range)
            })
        }
    });
    return {
        seeds,
        mapper: res
    };
}

const mapToNewValue = (value: number, mappers: Map[]) => {
    const correctMapper = mappers.reverse().find(mapper => mapper.from <= value && mapper.from + mapper.range - 1 >= value);

    if (correctMapper == null) {
        return value;

    } else {
        return correctMapper.to + (value - correctMapper.from);
    }
}