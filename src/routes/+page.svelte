<script lang="ts">
	import 'virtual:uno.css';
	import '@unocss/reset/tailwind-compat.css';

	// ゼロ埋め
	function padZero(num: number, length: number) {
		return (Array(length).join('0') + num).slice(-length);
	}

	const emojiByDay = [
		['☀️', ':sunny:'],
		['🌙', ':crescent_moon:'],
		['🔥', ':fire:'],
		['💧', ':droplet:'],
		['🌲', ':evergreen_tree:'],
		['🥇', ':first_place:'],
		['🌱', ':seedling:']
	];

	const daynames = ['日', '月', '火', '水', '木', '金', '土'];

	function getDayName(day: number) {
		return daynames[day] || ' ';
	}

	function getEmojiByDay(day: number) {
		return emojiByDay[day][0] || ' ';
	}

	let dateFirstStr = `${new Date().getFullYear()}-${padZero(new Date().getMonth() + 1, 2)}-${padZero(new Date().getDate(), 2)}`;
	let dateLastStr = `${new Date().getFullYear()}-${padZero(new Date().getMonth() + 1, 2)}-${padZero(new Date().getDate(), 2)}`;
	let timeStr = '19:00';

	let dateFirst = new Date(dateFirstStr);
	let dateLast = new Date(dateLastStr);
	let choiceList: string[] = [];

	$: dateFirst = new Date(dateFirstStr);
	$: dateLast = new Date(dateLastStr);

	$: {
		choiceList = [];
		let date = new Date(dateFirst);
		while (date <= dateLast) {
			choiceList.push(
				`${date.getMonth() + 1}/${date.getDate()} (${getDayName(date.getDay())}) ${timeStr} - ${getEmojiByDay(date.getDay())}`
			);
			date.setDate(date.getDate() + 1);
		}
	}

	const textStart = '以下の中から、参加可能な日付をリアクションで選んでください:';
	const textEnd = 'よろしくお願いします！';
</script>

<div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
	<h1 class="text-2xl my-8">Mariners' Conference リアクション日付調整キット</h1>

	<h2 class="text-md mt-6 mb-2">日付の範囲</h2>
	<div>
		<input type="date" class="border border-gray-300 rounded-md p-2" bind:value={dateFirstStr} />
		<span class="mx-2">〜</span>
		<input type="date" class="border border-gray-300 rounded-md p-2" bind:value={dateLastStr} />
	</div>

	<h2 class="text-md mt-6 mb-2">開始する時間帯</h2>
	<div>
		<input
			type="text"
			class="border border-gray-300 rounded-md p-2 text-center w-20"
			bind:value={timeStr}
		/>
	</div>

	<div class="m-8 border border-gray-300 rounded-md p-4">
		<div class="text-xs text-gray-500">{textStart}</div>
		<div class="m-2">
			{#each choiceList as choice}
				<div>{choice}</div>
			{/each}
		</div>
		<div class="text-xs text-gray-500">{textEnd}</div>
		<button
			class="px-2 py-1 border border-gray-300 text-sm rounded-md mt-4 bg-white text-gray-500 hover:bg-gray-100"
			on:click={() => {
				navigator.clipboard.writeText(`${textStart}\n${choiceList.join('\n')}\n${textEnd}`);
				alert('コピーしました');
			}}>クリップボードにコピー</button
		>
	</div>

	<div class="text-sm text-gray-500">絵文字の名称</div>
	<div class="text-sm text-gray-500 flex justify-center gap-5">
		<div>
			{#each emojiByDay as emoji}
				{emoji[0]}<br />
			{/each}
		</div>
		<div>
			{#each emojiByDay as emoji}
				{emoji[1]}<br />
			{/each}
		</div>
	</div>
</div>
