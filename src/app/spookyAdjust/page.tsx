"use client";
import React, { useState, useRef, useEffect } from "react";
import { FloatingDock } from "@/components/floating-dock";
import clsx from "clsx";
import links from "@/conf/links";
import { title, subtitle } from "@/components/primitives";
import { variable } from "@/components/font/fontProvider";
import { CldUploadButton, CldImage } from "next-cloudinary";
import { Button, ButtonGroup, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { IconCaretDown } from "@tabler/icons-react";
export default function SpookyAdjust() {
  const [info, setInfo] = useState();
  const [error, setError] = useState();
  //const [isUploading, setIsUploading] = useState(false);
  const [isTransforming, setIsTransforming] = useState(false);
  const spookyRef = useRef<HTMLImageElement>(null)

  function handleSuccess(result, widget) {
    setInfo(result?.info);
    setError(null);
    widget.close({
      quiet: true,
    });
  }

  function handleError(error, _widget) {
    setInfo(null);
    setError(error);
  }

  function handleDownload() {
    if (!spookyRef.current) return;
    fetch(spookyRef.current.src)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.href = url
        link.download = "spooky.png"
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)
      })
  }

  const [selectedOption, setSelectedOption] = React.useState(new Set(["classic"]));
  const [selectedOverlay, setselectedOverlay] = React.useState(new Set(["noise"]));

  const selectedOptionValue = Array.from(selectedOption)[0];
  const selectedOverlayValue = Array.from(selectedOverlay)[0];

  const descriptionsMap = {
    classic:
      "Black and white with noise and shadows to create a 70s like ambient",
    traditional:
      "Embrace the pumpkin tradition with a dark-orange tint and ligh adjustments",
    toxic: "Feel the posion with a timeless green-purple tint",
  };

  const labelsMap = {
    classic: "Classic",
    traditional: "Traditional",
    toxic: "Toxic",
  }

  const overlaysMap = {
    noise:
      "A classic addition to horror styles, dust and noise can create a mysterious ambient",
    pandemic:
      "The contagious formula, dark-yellow faded vignette and spitted blood all arround the frame",
    glass:
      "Nothing better to say 'we are doomed' than a broken glass",
    fog:
      "Fog, our gaseous friend to add a dark vibe or to imagine one of the most disturbing stories if you are a writer born in Maine"
  }

  const overlayLabels = {
    noise: "Noise",
    pandemic: "Pandemic",
    glass: "Glass",
    fog: "Fog"

  }

  const getTransformation = () => {
    switch (Array.from(selectedOption)[0]) {
      case 'classic':
        return { grayscale: true, gradient: 'gradient_fade:symmetric:10' };
      case 'traditional':
        return { grayscale: true, gradient: 'gradient_fade,x_0.9', tint: 'equalize:50:orange', bright: "1", shadow: "100" };
      case 'toxic':
        return { grayscale: true, gradient: 'gradient_fade,x_0.9', tint: 'equalize:40:black:purple:green' };
      default:
        return '';
    }
  };

  const getOverlay = (): { id: string } => {
    switch (Array.from(selectedOverlay)[0]) {
      case 'noise':
        return { id: "noise-overlay" };
      case 'pandemic':
        return { id: "blood-overlay" };
      case 'glass':
        return { id: "glass-overlay" };
      case 'fog':
        return { id: "fog-overlay" };
      default:
        return { id: '' };
    }
  }

  const handleTransformationChange = () => {
    setIsTransforming(true);
  };

  useEffect(() => {
    handleTransformationChange();
  }, [selectedOption, selectedOverlay]);

  return (
    <section className={clsx("flex flex-col items-center text-center justify-center gap-4 py-8 md:py-10")}>
      <FloatingDock
        desktopClassName="fixed bottom-5"
        mobileClassName="fixed bottom-5 left-5"
        items={links}
      />
      <div className="inline-block text-center justify-center">
        <span className={clsx(title({ color: "halloween", size: "lg" }), "font-black text-6xl bg-gradient-to-tl dark:bg-gradient-to-bl", variable.className)}>Spookify</span>
        <br />
        <div className={subtitle({ class: "mt-4" })}>
          Transform your photos into halloween style with basic chromatic adjustments
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        <CldUploadButton
          uploadPreset="upload-hton"
          className="clicker me-2 flex items-center justify-center rounded-lg px-5 py-2 text-center font-bold bg-gradient-to-tr from-[#008170] via-[#005B41] to-[#232D3F] dark:from-[#EEDF7A] dark:via-[#D8A25E] dark:to-[#A04747] text-background text-xl"
          onError={handleError}
          onSuccess={handleSuccess}
        >

          Upload
        </CldUploadButton>

        {error && (
          <p className="mt-2 text-xs text-red-600">{error.statusText}</p>
        )}
        <div className="flex-col md:flex-row flex items-center gap-4">
          <h2>Spooky Style: </h2>
          <ButtonGroup variant="flat" className="drop-shadow-xl">
            <Button className="bg-background">{labelsMap[selectedOptionValue]}</Button>
            <Dropdown placement="bottom-end" className="bg-background drop-shadow-2xl">
              <DropdownTrigger className="bg-background clicker">
                <Button isIconOnly>
                  <IconCaretDown />
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Effect options"
                selectedKeys={selectedOption}
                selectionMode="single"
                onSelectionChange={setSelectedOption}
                className="max-w-[300px]"
              >
                {Object.keys(descriptionsMap).map((key) => (
                  <DropdownItem key={key} description={descriptionsMap[key]} className="clicker">
                    {labelsMap[key]}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </ButtonGroup>
        </div>
        <div className="flex-col md:flex-row flex items-center gap-4">
          <h2>Overlay Style: </h2>
          <ButtonGroup variant="flat" className="drop-shadow-xl">
            <Button className="bg-background">{overlayLabels[selectedOverlayValue]}</Button>
            <Dropdown placement="bottom-end" className="bg-background drop-shadow-2xl">
              <DropdownTrigger className="bg-background clicker">
                <Button isIconOnly>
                  <IconCaretDown />
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Overlay options"
                selectedKeys={selectedOverlay}
                selectionMode="single"
                onSelectionChange={setselectedOverlay}
                className="max-w-[300px]"
              >
                {Object.keys(overlaysMap).map((key) => (
                  <DropdownItem key={key} description={overlaysMap[key]} className="clicker">
                    {overlayLabels[key]}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </ButtonGroup>
        </div>
      </div>
      {info && (
        <div className="flex flex-col gap-6 items-center justify-center">
          <Button isDisabled={isTransforming} onClick={handleDownload} className={clsx("w-fit me-2 flex items-center justify-center rounded-lg px-5 py-2 text-center font-bold bg-gradient-to-tr from-[#008170] via-[#005B41] to-[#232D3F] disabled:from-[#5E807B] disabled:via-[#415E56] disabled:to-[#343A45] dark:from-[#EEDF7A] dark:via-[#D8A25E] dark:to-[#A04747] dark:disabled:from-[#EEE8BE] dark:disabled:via-[#D4B794] dark:disabled:to-[#AB8B8B] text-background text-xl transition-all duration-250", isTransforming ? "opacity-0 hidden" : "opacity-1")}>
            Download Spookified Image
          </Button>
          <div className="relative flex items-center justify-center">
            <div className={clsx("absolute w-full h-full backdrop-blur-md rounded-xl flex items-center justify-center transition-opacity duration-300", isTransforming ? "opacity-1" : "opacity-0")}>
              <CldImage
                format={info.format}
                id="spooky"
                className="rounded-xl max-w-2xl z-[5] absolute blur-sm"
                src={info.public_id}
                width={info.width}
                height={info.height}
                alt="SpookyPic"
                background="black"
              />
              <span className="loader z-10"></span>
            </div>
            <CldImage
              format={info.format}
              id="spooky"
              className="rounded-xl max-w-2xl"
              src={info.public_id}
              width={info.width}
              height={info.height}
              alt="Spooky Pic"
              background="black"
              grayscale={getTransformation().grayscale ? getTransformation().grayscale : false}
              sepia={getTransformation().sepia ? getTransformation().sepia : false}
              tint={getTransformation().tint ? getTransformation().tint : false}
              brightness={getTransformation().bright ? getTransformation().bright : false}
              onLoad={() => setIsTransforming(false)}
              ref={spookyRef}
              preserveTransformations
              overlays={[{
                publicId: getOverlay().id,
                effects: [
                  {
                    crop: 'fill',
                    gravity: 'auto',
                    width: info.width,
                    height: info.height,
                    opacity: getOverlay().id == "glass-overlay" ? 30 : 70
                  },
                ],
                flags: "layer_apply"
              }]}
            />
          </div>
        </div>
      )}
    </section>
  );
}

