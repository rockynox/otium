// *https://www.registers.service.gov.uk/registers/country/use-the-api*
import fetch from "cross-fetch";
import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";

interface CountryType {
    name: string;
    email: string
}

function sleep(delay = 0) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}

export default function Asynchronous() {
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState<CountryType[]>([]);
    const loading = open && options.length === 0;

    React.useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        (async () => {
            const response = await fetch("https://country.register.gov.uk/records.json?page-size=5000");
            await sleep(1e3); // For demo purposes.
            const countries = await response.json();
            // databaseReference.users.once("value", (snapshot: { val: any }) => {
            //     setUsers(snapshot.val());
            // });

            if (active) {
                setOptions(Object.keys(countries).map((key) => countries[key].item[0]) as CountryType[]);
            }
        })();

        return () => {
            active = false;
        };
    }, [loading]);

    React.useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    return (
        <Autocomplete
            id="asynchronous-demo"
            style={{width: 300}}
            open={open}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            getOptionSelected={(option, value) => option.name === value.name}
            getOptionLabel={(option) => option.name}
            options={options}
            loading={loading}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Asynchronous"
                    variant="outlined"
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                {loading ? <CircularProgress color="inherit" size={20}/> : null}
                                {/*{params.InputProps.endAdornment}*/}
                            </React.Fragment>
                        )
                    }}
                />
            )}
        />
    );
}
