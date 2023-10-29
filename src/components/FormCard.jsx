import ColorSquare from "./ColorSquare"
import PlusButton from "./PlusButton"
import FormCardSection from "./FormCardSection"
import FormCardInput from "./FormCardInput"
import FormCardRadio from "./FormCardRadio"
import FormCardWrapper from "./FormCardWrapper"

export default function FormCard({
    lightBg,
    setLightBg,
    darkBg,
    setDarkBg,
    primaryColor,
    setPrimaryColor,
    secondaryColors,
    setSecondaryColors,
    lightnessTolerance,
    setLightnessTolerance,
    chromacityTolerance,
    setChromacityTolerance,
    targetContrastShades,
    setTargetContrastShades,
    setFormSubmitted,
    targetColorGamut,
    setTargetColorGamut,
}) {
    const rectangleStyle = {
        width: "100%",
        height: "40px",
        border: "1px solid #000",
        cursor: "pointer",
    }

    return (
        <FormCardWrapper title={"Color palette configuration"}>
            <FormCardSection
                title="Primary Color"
                description="The main color of the palette remains unchanged. We'll measure how it contrasts against a white
                    background, and then adjust the nearest contrast step based on its value. This way, we don't need to
                    modify the main color to get the right contrast. Typically, you'd pick your primary brand color. We
                    create the first set of shades based on this color. These shades guide the lightness and chromacity
                    targets for the other color shades in the palette.">
                <div className="form-card-section-grid">
                    <ColorSquare rectangleStyle={rectangleStyle} color={primaryColor} setColor={setPrimaryColor} />
                </div>
            </FormCardSection>

            <FormCardSection
                title="Secondary Colors"
                description="These colors serve as the additional shades in your palette. Given the way this palette is created, it's
                    probable that the secondary colors you provide won't appear as is. They act more as a reference. Their
                    lightness and chromacity will be tailored according to the primary color's shades. While we aim to
                    maintain the original hue you've selected, to meet the desired lightness, chromacity, and contrast, we
                    might need to tweak the hue. However, we'll strive to stay true to the initial hue.">
                <div className="form-card-section-grid">
                    {secondaryColors.map((colorObj, index) => (
                        <ColorSquare
                            key={index}
                            rectangleStyle={rectangleStyle}
                            color={colorObj}
                            setColor={(pickedColor) => {
                                setSecondaryColors((previouseColors) => [
                                    ...previouseColors.slice(0, index),
                                    pickedColor,
                                    ...previouseColors.slice(index + 1),
                                ])
                            }}
                        />
                    ))}
                    {secondaryColors.length <= 8 ? (
                        <PlusButton
                            style={{
                                gridColumnStart: "9",
                                width: rectangleStyle.width,
                                height: rectangleStyle.height,
                            }}
                            onClick={() => setSecondaryColors([...secondaryColors, "#000000"])}
                        />
                    ) : null}
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
                title="Contrast Steps"
                description="For determining shades based on contrast, we need the preferred contrast levels. The default levels are
                    those suggested by APCA.">
                <div className="form-card-section-grid">
                    {targetContrastShades
                        ? targetContrastShades.map((contrast, index) => (
                              <FormCardInput
                                  key={index}
                                  inputProps={{
                                      style: { width: "100%", minWidth: "0px", textAlign: "center" },
                                      value: contrast,
                                      onChange: (e) => {
                                          const updatedContrasts = [...targetContrastShades]
                                          updatedContrasts[index] = parseFloat(e.target.value)
                                          setTargetContrastShades(updatedContrasts)
                                      },
                                  }}
                              />
                          ))
                        : null}
                    {targetContrastShades.length <= 8 ? (
                        <PlusButton
                            style={{
                                gridColumnStart: "9",
                                width: rectangleStyle.width,
                                height: rectangleStyle.height,
                            }}
                            onClick={() => setTargetContrastShades((curSteps) => [...curSteps, 0])}
                        />
                    ) : null}
                </div>
            </FormCardSection>

            <FormCardSection
                title="Tolerances"
                description="When deriving shades for the secondary colors, we aim to match the target contrast value and the
                    lightness and chromacity of the primary color's equivalent shade. To achieve an exact match, we might
                    need to adjust the hue considerably,and there's no guarantee of an exact match distinct from the primary
                    color's shade. Therefore, we need to establish a tolerance of ± for the contrast, lightness, and
                    chromacity.">
                <div className="form-card-section-grid">
                    <FormCardInput
                        wrapperProps={{ className: "form-card-section-grid-span-3" }}
                        label="Lightness"
                        inputProps={{
                            value: lightnessTolerance,
                            id: "lightnessTolerance",
                            onChange: (e) => setLightnessTolerance(e.target.value),
                        }}
                    />
                    <FormCardInput
                        wrapperProps={{ className: "form-card-section-grid-span-3" }}
                        label="Chromacity"
                        inputProps={{
                            value: chromacityTolerance,
                            onChange: (e) => setChromacityTolerance(e.target.value),
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

            <div className="form-card-section-grid">
                <button
                    style={{ gridColumnStart: "4", gridColumnEnd: "7" }}
                    className="p-button--positive u-no-margin"
                    onClick={() => setFormSubmitted(true)}>
                    Generate Palette
                </button>
            </div>
        </FormCardWrapper>
    )
}
