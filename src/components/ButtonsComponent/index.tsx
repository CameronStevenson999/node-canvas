import { Component, createSignal, onCleanup } from "solid-js";
import styles from "./styles.module.css";

function clickOutside(el: any, accessor: any) {
    const onClick = (e: any) => !el.contains(e.target) && accessor()?.();
    document.body.addEventListener("click", onClick);

    onCleanup(() => document.body.removeEventListener("click", onClick));
}

interface ButtonsProps {
    showDelete: boolean;
    onClickAdd: (numberInputs: number, numberOutputs: number) => void;
    onClickDelete: () => void;
}

const ButtonsComponent: Component<ButtonsProps> = (props: ButtonsProps) => {
    const [isOpen, setIsOpen] = createSignal<boolean>(false);
    const [numberInputs, setNumberInputs] = createSignal<number>(0);
    const [numberOutputs, setNumberOutputs] = createSignal<number>(0);

    function handleOnClickAdd(event: any) {
        event.stopPropagation();
        setIsOpen(true);
    }

    function handleOnClickAddNode(event: any) {
        event.stopPropagation();
        
        if (numberInputs() > 4 || numberInputs() < 0 || numberOutputs() > 4 || numberOutputs() < 0) return;

        setIsOpen(false);
        props.onClickAdd(numberInputs(), numberOutputs());

        setNumberInputs(0);
        setNumberOutputs(0);
    }
    
    function handleChangeNumberInputs(event: any) {
        setNumberInputs(event.target.value);
    }

    function handleChangeNumberOutputs(event: any) {
        setNumberOutputs(event.target.value);
    }

    function handleClickOutsideDropdown() {
        setIsOpen(false);
        setNumberInputs(0);
        setNumberOutputs(0);
    }

    return (
    <div class={styles.wrapper}>
        <button class={props.showDelete ? styles.buttonDelete : styles.buttonDeleteHidden} onClick={props.onClickDelete}>
            <svg fill="currentColor" 
                    stroke-width="0" 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 448 512" 
                    height="1em" 
                    width="1em" 
                    style="overflow: visible; color: currentcolor;">
                <path d="M135.2 17.7 128 32H32C14.3 32 0 46.3 0 64s14.3 32 32 32h384c17.7 0 32-14.3 32-32s-14.3-32-32-32h-96l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32l21.2 339c1.6 25.3 22.6 45 47.9 45h245.8c25.3 0 46.3-19.7 47.9-45L416 128z">
                </path>
            </svg>
        </button>
        <button class={styles.buttonAdd} onClick={handleOnClickAdd}>
            <svg fill="currentColor" 
                    stroke-width="0" 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 512 512" 
                    height="1em" 
                    width="1em" 
                    style="overflow: visible; color: currentcolor;">
                <path d="M256 512a256 256 0 1 0 0-512 256 256 0 1 0 0 512zm-24-168v-64h-64c-13.3 0-24-10.7-24-24s10.7-24 24-24h64v-64c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24h-64v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z">
                </path>
            </svg>
        </button>
        <div class={isOpen() ? styles.dropdown : styles.dropdownHidden}
                //@ts-ignore
                use:clickOutside={handleClickOutsideDropdown}>

            <label class={styles.label}>Number of inputs</label>
            <input class={styles.input} type="number" value={numberInputs()} onInput={handleChangeNumberInputs}></input>
            <label class={styles.label}>Number of outputs</label>
            <input class={styles.input} type="number" value={numberOutputs()} onInput={handleChangeNumberOutputs}></input>
            <button class={styles.buttonRect} onClick={handleOnClickAddNode}>
                Add node
            </button>
        </div>
    </div>);
};

export default ButtonsComponent;
