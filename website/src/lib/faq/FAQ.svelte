<div class="pair">
    <div class="question">
        <b>Q:&nbsp;</b><slot name="question" />
    </div>
    <div class="answer">
        <p>A:&nbsp;</p>
        <slot name="answer" />
    </div>
</div>

<style>
    * {
        font-size: 1.2rem;
    }

    .pair {
        padding-top: 10px;
        padding-bottom: 10px;
    }

    .answer {
        padding-left: 10px;
    }

    b {
        display: inline;
    }

    p {
        display: inline;
    }
</style>
