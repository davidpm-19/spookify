"use client";
import React, { useState, useRef, useEffect } from "react";
import { FloatingDock } from "@/components/floating-dock";
import clsx from "clsx";
import links from "@/conf/links";
import { title, subtitle } from "@/components/primitives";
import { variable } from "@/components/font/fontProvider";
import { CldUploadButton, CldImage } from "next-cloudinary";
import { Button, ButtonGroup, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Textarea } from "@nextui-org/react";
import { IconCaretDown } from "@tabler/icons-react";
export default function SpookyAdjust() {
  const [info, setInfo] = useState();
  const [error, setError] = useState();
  const [cprompt, setCustomPrompt] = useState<string>('');
  const [prompt, setPrompt] = useState<string>('')
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
        link.download = "undead.png"
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)
      })
  }

  const [selectedOption, setSelectedOption] = React.useState(new Set(["zombie"]));
  const [selectedGender, setSelectedGender] = React.useState(new Set(["male"]));

  const selectedOptionValue = Array.from(selectedOption)[0];
  const selectedGenderValue = Array.from(selectedGender)[0];

  const descriptionsMap = {
    zombie:
      "Rotten flesh, black veins, blood injected sclera and a pale green skin tone, if it looks like a zombie and acts like one then for sure it's a zombie",
    ghost:
      "The classic undead experience, more peaceful than a zombie unless you are in the 80s New York",
    skeleton:
      "The end for everyone who does not obey grandma and eats more than any human biologically can, but it's not bad at all...you have good aim in a game of cubes ",
    custom:
      "Want to try your own ideas? Create your prompt and see how it looks like"
  };

  const labelsMap = {
    zombie: "Zombie",
    ghost: "Ghost",
    skeleton: "Skeleton",
    custom: "Custom"
  }

  const genderDescriptions = {
    male:
      "Due to AI features are still on an early version choose your 'traditional' gender in order to improve results and avoid gender swap and potenitally prevent undesired transformations",
    female:
      "Due to AI features are still on an early version choose your 'traditional' gender in order to improve results and avoid gender swap and potenitally prevent undesired transformations",
    other:
      "If you do not identify yourself with one of the above genders and don't want to choose one for body features alikeness choose this options, results may include gender swap, modification on some facial features or randomized subject replacement"
  }

  const genderLabels = {
    male: "Male",
    female: "Female",
    other: "Other"
  }

  const getPrompt = () => {
    switch (Array.from(selectedOption)[0]) {
      case 'zombie':
        return { prompt: `turn the ${selectedGender} into a zombie keep facial features and expressions make the skin pale green with bruises and add blood` };
      case 'ghost':
        return { prompt: `turn the ${selectedGender} into a ghost keep facial features and expressions make the skin pale gray with some transparent areas and add a green glow translucid effect` };
      case 'skeleton':
        return { prompt: 'skeleton' };
      case 'custom':
        return { prompt: prompt };
      default:
        return '';
    }
  };


  const handleTransformationChange = () => {
    setIsTransforming(true);
  };

  useEffect(() => {
    if (info) {
      setIsTransforming(true);
    }

    if (selectedOptionValue !== "custom") {
      setCustomPrompt('')
    }

    handleTransformationChange();

  }, [info, selectedOptionValue, selectedGender])

  return (
    <section className={clsx("flex flex-col items-center text-center justify-center gap-4 py-8 md:py-10")}>
      <FloatingDock
        desktopClassName="fixed bottom-5"
        mobileClassName="fixed bottom-5 left-5"
        items={links}
      />
      <div className="inline-block text-center justify-center">
        <span className={clsx(title({ color: "halloween", size: "lg" }), "font-black text-6xl bg-gradient-to-tl dark:bg-gradient-to-bl", variable.className)}>UndeadMe</span>
        <br />
        <div className={subtitle({ class: "mt-4" })}>
          Turn any portrait into an horror experience with AI
        </div>
      </div>
      <div className="flex flex-col min-[450px]:flex-row gap-4 items-center">
        <CldUploadButton
          uploadPreset="upload-hton"
          className="drop-shadow-xl me-2 flex items-center justify-center rounded-lg px-3 min-[45px]:px-5 py-2 text-center font-bold bg-gradient-to-tr from-[#008170] via-[#005B41] to-[#232D3F] dark:from-[#EEDF7A] dark:via-[#D8A25E] dark:to-[#A04747] text-background text-md min-[450px]:text-xl"
          onError={handleError}
          onSuccess={handleSuccess}
        >

          Upload
        </CldUploadButton>

        {error && (
          <p className="mt-2 text-xs text-red-600">{error.statusText}</p>
        )}
        <div className="flex-col md:flex-row flex items-center gap-4">
          <ButtonGroup variant="flat" className="drop-shadow-xl">
            <Button className="bg-background">{labelsMap[selectedOptionValue]}</Button>
            <Dropdown placement="bottom-end" className="bg-background drop-shadow-2xl">
              <DropdownTrigger className="bg-background">
                <Button isIconOnly>
                  <IconCaretDown />
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Undead options"
                selectedKeys={selectedOption}
                selectionMode="single"
                onSelectionChange={setSelectedOption}
                className="max-w-[300px]"
              >
                {Object.keys(descriptionsMap).map((key) => (
                  <DropdownItem key={key} description={descriptionsMap[key]}>
                    {labelsMap[key]}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </ButtonGroup>
        </div>
        <div className="flex-col md:flex-row flex items-center gap-4">
          <ButtonGroup variant="flat">
            <Button className="bg-background"> {genderLabels[selectedGenderValue]} </Button>
            <Dropdown placement="bottom-end" className="bg-background drop-shadow-2xl opacity-1">
              <DropdownTrigger className="bg-background">
                <Button isIconOnly>
                  <IconCaretDown />
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Gender options"
                selectedKeys={selectedGender}
                selectionMode="single"
                onSelectionChange={setSelectedGender}
                className="max-w-[300px]"
              >
                {Object.keys(genderDescriptions).map((key) => (
                  <DropdownItem key={key} description={genderDescriptions[key]}>
                    {genderLabels[key]}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </ButtonGroup>
        </div>
      </div>
      {selectedOptionValue === "custom" && (
        <div className="w-[80%] sm:w-[90%] md:w-[70%] lg:w-[50%] flex flex-col sm:flex-row gap-4 h-auto">
          <Textarea
            variant="flat"
            minRows={1}
            labelPlacement="outside"
            placeholder="Enter your prompt"
            className="w-full sm:w-[60%] md:w-full drop-shadow-xl"
            value={cprompt}
            onValueChange={setCustomPrompt}
          />
          <Button
            className="w-full sm:w-[40%] md:w-[60%] drop-shadow-xl me-2 flex items-center justify-center rounded-lg px-5 py-2 text-center font-bold bg-gradient-to-tr from-[#008170] via-[#005B41] to-[#232D3F] dark:from-[#EEDF7A] dark:via-[#D8A25E] dark:to-[#A04747] text-background text-md sm:text-lg xl:text-xl"
            onPress={() => setPrompt(cprompt)}
          >
            Use your Prompt
          </Button>
        </div>
      )}
      {info && (
        <div className="flex flex-col gap-6 items-center justify-center">
          <Button isDisabled={isTransforming} onClick={handleDownload} className={clsx("w-fit me-2 flex items-center justify-center rounded-lg px-5 py-2 text-center font-bold bg-gradient-to-tr from-[#008170] via-[#005B41] to-[#232D3F] disabled:from-[#5E807B] disabled:via-[#415E56] disabled:to-[#343A45] dark:from-[#EEDF7A] dark:via-[#D8A25E] dark:to-[#A04747] dark:disabled:from-[#EEE8BE] dark:disabled:via-[#D4B794] dark:disabled:to-[#AB8B8B] text-background text-xl transition-all duration-250", isTransforming ? "opacity-0 hidden" : "opacity-1")}>
            Download Undead Image
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
                alt="HorrorPortrait"
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
              alt="Horror Portrait"
              background="black"
              onLoad={() => setIsTransforming(false)}
              replace={{
                from: selectedGender === "Other" ? 'subject' : selectedGender,
                to: getPrompt().prompt ? getPrompt().prompt : '',
                preserveGeometry: true
              }}
              ref={spookyRef}
              preserveTransformations
            />
          </div>
        </div>
      )}
    </section>
  );
}

