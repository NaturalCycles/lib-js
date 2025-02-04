import{_ as e,c as a,o,ae as d}from"./chunks/framework.CtOmD4Hd.js";const p=JSON.parse('{"title":"LocalDate, LocalTime","description":"","frontmatter":{},"headers":[],"relativePath":"date.md","filePath":"date.md"}'),i={name:"date.md"};function r(l,t,s,n,c,m){return o(),a("div",null,t[0]||(t[0]=[d('<h1 id="localdate-localtime" tabindex="-1">LocalDate, LocalTime <a class="header-anchor" href="#localdate-localtime" aria-label="Permalink to &quot;LocalDate, LocalTime&quot;">​</a></h1><h2 id="why" tabindex="-1">Why? <a class="header-anchor" href="#why" aria-label="Permalink to &quot;Why?&quot;">​</a></h2><p>Serves as an alternative / replacement of <a href="https://momentjs.com/" target="_blank" rel="noreferrer">Moment.js</a> / <a href="https://github.com/iamkun/dayjs/" target="_blank" rel="noreferrer">Day.js</a>.</p><p>It tries to address the shortcomings of Day.js and <a href="https://github.com/NaturalCycles/time-lib" target="_blank" rel="noreferrer">time-lib</a>.</p><p><code>time-lib</code> was created as a wrapper around Day.js, due to following limitations:</p><ul><li>Day.js doesn&#39;t provide all features that we need without plugins. This creates an &quot;import problem&quot;: you cannot just import <code>dayjs</code>, you need to import it from a place that had plugins properly installed and initialized. It immediately creates an &quot;import ambiguity&quot;: should I import from <code>dayjs</code> or from <code>my_code/dayjs.ts</code>?</li><li>Day.js is created as CommonJS module, all plugins has to be explicitly <code>require</code>d. There are issues around TypeScript <code>esModuleInterop</code>. Result of it is that we needed to completely fork Day.js types and put it into <code>time-lib</code>.</li><li>There are more/deeper ESM issues when it&#39;s used in ESM context (e.g with Vite).</li></ul><p>Next level of reasoning is that we needed our own opinionated API that would use standards that we use, for example:</p><ul><li>We always use classic Unixtime (in seconds, not milliseconds)</li><li>We always use classic ISO8601 date without timezone, e.g <code>1984-06-21</code></li></ul><p>Just the second/millisecond confusion can create serious bugs.</p><p>Mixup between similarly-called <code>.toISOString</code> and <code>.toISODate</code> can create very subtle bugs.</p><p>So, after multiple issues being accumulated and inability to properly fork Day.js, it was decided to try and simply <strong>rewrite</strong> Day.js functionality into <code>LocalDate</code> and <code>LocalTime</code>.</p><p>Reasons:</p><ul><li>No milliseconds in the API (not needed)</li><li>Classic UnixTime, never &quot;millisecond unixtime&quot;</li><li>No timezone support/confusion, all dates/times are always treated as &quot;local&quot; (inspired by Java LocalDate/LocalDateTime)</li><li>Ability to parse &quot;timezone-aware ISO8601 string&quot;, e.g <code>1984-06-21T17:15:02+02</code> into a LocalDate of just <code>1984-06-21</code> or LocalTime of <code>1984-06-21T17:15:02</code> (try achieving it with Moment.js or Day.js!)</li><li><code>.toJSON</code> automatically formats LocalTime as unixtimestamp, LocalDate as ISO8601 date-only string</li><li>Prevents <code>dayjs(undefined)</code> being <code>dayjs.now()</code></li><li>Strict parsing/validation by default. Will validate all input upon creation and will throw parse error on any invalid input. We believe it allows to catch errors sooner.</li><li>Optimized for performance and code maintenance, not on code size (as Day.js is, which results in its poorer performance in certain cases, and/or in less code maintainability)</li><li>No arbitrary <code>.format</code> by design. List of well-known format outputs instead.</li><li>Separate <code>LocalDate</code> class for simplified (and more performant) dealing with &quot;just Dates without time information&quot;. Similar to Java&#39;s <code>LocalDate</code>. It allows <strong>much more</strong> simple and robust implementation, compared to dealing with js <code>Date</code> object intricacies (mostly around timezones).</li></ul><h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-label="Permalink to &quot;API&quot;">​</a></h2><p>API is designed to be closely (but not 100%) compatible with Day.js/Moment.js.</p><p>Examples:</p><table tabindex="0"><thead><tr><th></th><th>day.js (via time-lib)</th><th>LocalTime</th><th>LocalDate</th></tr></thead><tbody><tr><td>now</td><td>dayjs()</td><td>localTime.now()</td><td></td></tr><tr><td>today</td><td>dayjs().startOf(&#39;day&#39;)</td><td></td><td>localDate.today()</td></tr><tr><td>create from unixtimestamp</td><td>dayjs.unix(ts)</td><td>localTime(ts)</td><td></td></tr><tr><td>parse from ISO8601 date string</td><td>dayjs(str)</td><td></td><td>localDate(str)</td></tr><tr><td>parse from ISO8601 date+time string</td><td>dayjs(str)</td><td>localTime(str)</td><td></td></tr><tr><td>now plus 1 hour</td><td>dayjs().add(1, &#39;hour&#39;)</td><td>localTime().plus(1, &#39;hour&#39;)</td><td></td></tr><tr><td>today plus 1 day</td><td>dayjs().startOf(&#39;day&#39;).add(1, &#39;day&#39;)</td><td></td><td>localDate().plus(1, &#39;day&#39;)</td></tr><tr><td>toISODate (just date)</td><td>dayjs().toISODate()</td><td>localTime().toISODate()</td><td>localDate().toISODate()</td></tr><tr><td>toISODate with time</td><td>dayjs().format()</td><td>localTime().toISODateTime()</td><td></td></tr><tr><td>diff in days</td><td>dayjs().diff(other, &#39;day&#39;)</td><td>localTime().diff(other, &#39;day&#39;)</td><td>localDate().diff(other, &#39;day&#39;)</td></tr><tr><td>to unixtimestamp</td><td>dayjs().unix()</td><td>localTime().unix()</td><td>localDate().unix()</td></tr><tr><td>isBefore</td><td>dayjs().isBefore(other)</td><td>localTime().isBefore(other)</td><td>localDate().isBefore(other)</td></tr></tbody></table><p>As you can see above - API is kept very similar.</p><h2 id="dateinterval" tabindex="-1">DateInterval <a class="header-anchor" href="#dateinterval" aria-label="Permalink to &quot;DateInterval&quot;">​</a></h2><p>Useful to describe an interval of Dates, e.g [inclusive] interval between <code>1984-06-21</code> and <code>1984-07-11</code> can be described as <code>1984-06-21/1984-07-11</code> (as per <a href="https://en.wikipedia.org/wiki/ISO_8601#Time_intervals" target="_blank" rel="noreferrer">ISO8601</a>).</p><p><code>.toJSON</code> automatically stringifies DateInterval into a string.</p><p>Create DateInterval: <code>DateInterval.parse(&#39;1984-06-21/1984-07-11&#39;)</code> or <code>DateInterval.of(&#39;1984-06-21&#39;, &#39;1984-07-11&#39;)</code>.</p>',22)]))}const h=e(i,[["render",r]]);export{p as __pageData,h as default};
