import { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import { Country, CountryState } from "@/types/auth";
import SimpleSelect from "@/components/inputs/SimpleSelect";
import { authRequestCollection } from "@/api/auth";
import { FormikErrors } from "formik";

interface LocationInputProps {
    onChange?: (location: { country?: Country; country_state?: CountryState }) => void;
    errors?: FormikErrors<{ country: string; country_state: string }>;
}

const LocationInput = ({ onChange, errors }: LocationInputProps) => {
    const [selectedCountry, setSelectedCountry] = useState<Country>();
    const [selectedState, setSelectedState] = useState<CountryState>();

    // Reset city/state when country changes
    useEffect(() => {
        setSelectedState(undefined);
    }, [selectedCountry]);

    // Call onChange whenever country or state updates
    useEffect(() => {
        if (onChange) {
            onChange({
                country: selectedCountry ?? undefined,
                country_state: selectedState ?? undefined
            });
        }
    }, [selectedCountry, selectedState, onChange]);

    return (
        <Grid container spacing={4}>
            {/* Country Selection */}
            <Grid xs={12} sm={6} md={6} lg={6} item>
                <SimpleSelect<Country>
                    titleRequired
                    title="Organization Location"
                    displayKey="name_en"
                    value={selectedCountry}
                    onChange={setSelectedCountry}
                    requestConfig={authRequestCollection.getCountries}
                    error={errors?.country}
                />
            </Grid>

            {/* State/City Selection */}
            <Grid xs={12} sm={6} md={6} lg={6} item>
                <SimpleSelect<CountryState>
                    title="State / City"
                    titleRequired
                    displayKey="name_en"
                    items={selectedCountry?.country_states}
                    value={selectedState}
                    onChange={setSelectedState}
                    disabled={!selectedCountry}
                    error={errors?.country_state}
                />
            </Grid>
        </Grid>
    );
};

export default LocationInput;
