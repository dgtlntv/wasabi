import FormCardSection from "../FormCard/FormCardSection"
import FormCardWrapper from "../FormCard/FormCardWrapper"
import ColorSquare from "../FormCard/ColorSquare"
import FormCardInput from "../FormCard/FormCardInput"
import FormCardRadio from "../FormCard/FormCardRadio"
import FormCardCheckbox from "../FormCard/FormCardCheckbox"

export default function DataVizPaletteFormCard({
    primaryColor,
    setPrimaryColor,
    lightBg,
    setLightBg,
    darkBg,
    setDarkBg,
    spread,
    setSpread,
    colorblindness,
    setColorblindness,
    contrast,
    setContrast,
    T,
    setT,
    T_min,
    setT_min,
    alpha,
    setAlpha,
    targetColorGamut,
    setTargetColorGamut,
    perturbOptions,
    setPerturbOptions,
    amountOfColors,
    setAmountOfColors,
    setFormSubmitted,
}) {
    const rectangleStyle = {
        width: "100%",
        height: "40px",
        border: "1px solid #000",
        cursor: "pointer",
    }

    return (
        <FormCardWrapper title="Data viz palette configuration">
            <FormCardSection
                title="Primary Color"
                description="The main color of the palette remains unchanged. We'll develop other colors for the Dataviz palette from this one.">
                <div className="form-card-section-grid">
                    <ColorSquare rectangleStyle={rectangleStyle} color={primaryColor} setColor={setPrimaryColor} />
                </div>
            </FormCardSection>

            <FormCardSection
                title="Backgrounds"
                description="We have to determine the contrast against certain backgrounds. Because this is a symetrical color
                    palette, we'll assess it against both dark and light backgrounds. Please select the default background
                    colors for both the light and dark modes of your design system.">
                <div className="form-card-section-grid">
                    <ColorSquare rectangleStyle={rectangleStyle} color={lightBg} setColor={setLightBg} />
                    <ColorSquare rectangleStyle={rectangleStyle} color={darkBg} setColor={setDarkBg} />
                </div>
            </FormCardSection>

            <FormCardSection
                title="Weights"
                description='In the energy function of the simulated annealing we are weighting different aspects of the palette
                to evaluate how "good" a palette is. You can change the to weight those aspects here.
                '>
                <div className="form-card-section-grid">
                    <FormCardInput
                        wrapperProps={{ className: "form-card-section-grid-span-3" }}
                        label="Spread"
                        inputProps={{
                            value: spread,
                            id: "spread",
                            onChange: (e) => setSpread(e.target.value),
                        }}
                    />
                    <FormCardInput
                        wrapperProps={{ className: "form-card-section-grid-span-3" }}
                        label="Colorblindness"
                        inputProps={{
                            value: colorblindness,
                            onChange: (e) => setColorblindness(e.target.value),
                        }}
                    />
                    <FormCardInput
                        wrapperProps={{ className: "form-card-section-grid-span-3" }}
                        label="Contrast"
                        inputProps={{
                            value: contrast,
                            onChange: (e) => setContrast(e.target.value),
                        }}
                    />
                </div>
            </FormCardSection>

            <FormCardSection
                title="Simulated annealing"
                description="To find the optimal shades simulated annealing is used. You can adjust for how long and how detailed its searching by adjusting the following parameters.">
                <div className="form-card-section-grid">
                    <FormCardInput
                        wrapperProps={{ className: "form-card-section-grid-span-3" }}
                        label="Initial Temperature"
                        inputProps={{
                            value: T,
                            id: "T",
                            onChange: (e) => setT(e.target.value),
                        }}
                    />
                    <FormCardInput
                        wrapperProps={{ className: "form-card-section-grid-span-3" }}
                        label="Minimum temperature"
                        inputProps={{
                            value: T_min,
                            onChange: (e) => setT_min(e.target.value),
                        }}
                    />
                    <FormCardInput
                        wrapperProps={{ className: "form-card-section-grid-span-3" }}
                        label="Cooling rate"
                        inputProps={{
                            value: alpha,
                            onChange: (e) => setAlpha(e.target.value),
                        }}
                    />
                </div>
            </FormCardSection>

            <FormCardSection
                title="Color Gammut target"
                description="As we are doing the calculations in OKLCH we have the opportunity to not only have colors in the srgb
                    color gamut, but also for Display P3. You can choose if you want colors which are only available in the
                    Display P3 color gamut or if you want to force all colors to be in srgb. Be aware however, that if we
                    limit our color gamut to srgb we might need to adjust the shades more to find colors that are available
                    in srgb.">
                <div className="form-card-section-grid">
                    <FormCardRadio
                        defaultChecked={targetColorGamut === "p3" ? true : false}
                        wrapperProps={{ className: "form-card-section-grid-span-3" }}
                        label="Display P3"
                        name="colorGamut"
                        onChange={(e) => setTargetColorGamut("p3")}
                    />
                    <FormCardRadio
                        defaultChecked={targetColorGamut === "srgb" ? true : false}
                        label="srgb"
                        name="colorGamut"
                        wrapperProps={{ className: "form-card-section-grid-span-3" }}
                        onChange={(e) => setTargetColorGamut("srgb")}
                    />
                </div>
            </FormCardSection>

            <FormCardSection
                title="Peturb options"
                description="You can choose which things should be adjusted when changing the colors, otherwise they will be the same as the primary color.">
                <div className="form-card-section-grid">
                    <FormCardCheckbox
                        defaultChecked={perturbOptions[0]}
                        wrapperProps={{ className: "form-card-section-grid-span-3" }}
                        label="Lightness"
                        onChange={(e) => setPerturbOptions((options) => [e.target.checked, options[1], options[2]])}
                    />

                    <FormCardCheckbox
                        defaultChecked={perturbOptions[1]}
                        label="Chromacity"
                        wrapperProps={{ className: "form-card-section-grid-span-3" }}
                        onChange={(e) => setPerturbOptions((options) => [options[0], e.target.checked, options[2]])}
                    />

                    <FormCardCheckbox
                        defaultChecked={perturbOptions[2]}
                        label="Hue"
                        wrapperProps={{ className: "form-card-section-grid-span-3" }}
                        onChange={(e) => setPerturbOptions((options) => [options[0], options[1], e.target.checked])}
                    />
                </div>
            </FormCardSection>

            <FormCardSection
                title="Amount of Colors in Palette"
                description="Set the amount of colors you want to have in your palette">
                <div className="form-card-section-grid">
                    <FormCardInput
                        wrapperProps={{ className: "form-card-section-grid-span-3" }}
                        label="Amount of colors"
                        inputProps={{
                            value: amountOfColors,
                            id: "amountOfColors",
                            onChange: (e) => setAmountOfColors(e.target.value),
                        }}
                    />
                </div>
            </FormCardSection>

            <div className="form-card-section-grid">
                <button
                    style={{ gridColumnStart: "4", gridColumnEnd: "7" }}
                    className="p-button--positive u-no-margin"
                    onClick={() => setFormSubmitted(true)}>
                    Generate Shades Palette
                </button>
            </div>
        </FormCardWrapper>
    )
}
