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
        link.download = "horrorland.png"
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)
      })
  }


  const [selectedOption, setSelectedOption] = React.useState(new Set(["hell"]));
  const selectedOptionValue = Array.from(selectedOption)[0];

  const descriptionsMap = {
    hell:
      "Rotten flesh, black veins, blood injected sclera and a pale green skin tone, if it looks like a zombie and acts like one then for sure it's a zombie",
    forest:
      "The classic undead experience, more peaceful than a zombie unless you are in the 80s New York",
    castle:
      "The end for everyone who does not obey grandma and eats more than any human biologically can, but it's not bad at all...you have good aim in a game of cubes ",
    custom:
      "Want to try your own ideas? Create your prompt and see how it looks like"
  };

  const labelsMap = {
    hell: "Hell",
    forest: "Forest",
    castle: "Castle",
    custom: "Custom"
  };

  const getPrompt = () => {
    switch (Array.from(selectedOption)[0]) {
      case 'hell':
        return { prompt: 'Turn the background into a detailed hell representation with demons and fire' };
      case 'forest':
        return { prompt: 'Transform the background into spooky dark forest with large trees a gray ambient fog and a night time with full moon' };
      case 'castle':
        return { prompt: 'Set the background as a horror haunted castle in ruins with a blood moons cene and dark fog' };
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

  }, [info, selectedOptionValue, selectedOption])

  return (
    <section className={clsx("flex flex-col items-center text-center justify-center gap-4 py-8 md:py-10")}>
      <FloatingDock
        desktopClassName="fixed bottom-5"
        mobileClassName="fixed bottom-5 left-5"
        items={links}
      />
      <div className="inline-block text-center justify-center">
        <span className={clsx(title({ color: "halloween", size: "lg" }), "font-black text-4xl sm:text-6xl bg-gradient-to-tl dark:bg-gradient-to-bl", variable.className)}>Horror Lands</span>
        <br />
        <div className={subtitle({ class: "mt-4" })}>
          Teleport into a spooky environment with AI Backgroud Replacement
        </div>
      </div>
      <div className="flex flex-row gap-4">
        <CldUploadButton
          uploadPreset="upload-hton"
          className="drop-shadow-xl me-2 flex items-center justify-center rounded-lg px-5 py-2 text-center font-bold bg-gradient-to-tr from-[#008170] via-[#005B41] to-[#232D3F] dark:from-[#EEDF7A] dark:via-[#D8A25E] dark:to-[#A04747] text-background text-md sm:text-xl"
          onError={handleError}
          onSuccess={handleSuccess}
        >
          Upload
        </CldUploadButton>

        {error && (
          <p className="mt-2 text-xs text-red-600">{error.statusText}</p>
        )}
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
            Download Horrorland Image
          </Button>
          <div className="relative flex items-center justify-center">
            <div className={clsx("absolute w-full h-full backdrop-blur-md rounded-xl flex items-center justify-center transition-opacity duration-300", isTransforming ? "opacity-1" : "opacity-0")}>
              <CldImage
                format={info.format}
                id="spooky"
                className="rounded-xl max-w-2xl z-[5] absolute blur-[2px]"
                src={info.public_id}
                width={info.width}
                height={info.height}
                alt="HorrorLand"
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
              alt="Horror Land"
              background="black"
              replaceBackground={{
                prompt: getPrompt().prompt ? getPrompt().prompt : '',
                seed: Math.floor(Math.random() * (99 - 1 + 1) + 1)
              }}
              onLoad={() => setIsTransforming(false)}
              onLoadCapture={() => setIsTransforming(true)}
              ref={spookyRef}
              preserveTransformations
            />
          </div>
        </div>
      )}
    </section>
  );
}

